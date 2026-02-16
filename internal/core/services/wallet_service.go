package services

import (
	"context"
	"errors"
	"strconv"

	"velo/internal/core"
	"velo/internal/ports"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type WalletService struct {
	db       *gorm.DB
	provider ports.PaymentProvider
}

func NewWalletService(db *gorm.DB, provider ports.PaymentProvider) *WalletService {
	return &WalletService{
		db:       db,
		provider: provider,
	}
}

// ensureWalletExists ensures a wallet record exists in our DB, creating one if necessary via the provider
func (s *WalletService) EnsureWallet(ctx context.Context, userID uuid.UUID) (*core.Wallet, error) {
	var wallet core.Wallet
	err := s.db.Where("user_id = ?", userID).First(&wallet).Error
	if err == nil {
		return &wallet, nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// Create wallet via provider
	providerWallet, err := s.provider.CreateWallet(ctx, userID.String())
	if err != nil {
		return nil, err
	}

	// Save to DB
	wallet = core.Wallet{
		ID:         uuid.New(),
		UserID:     userID,
		Provider:   s.provider.Name(),
		ExternalID: providerWallet.ID,
		Currency:   providerWallet.Currency,
		Balance:    providerWallet.Balance,
	}

	if err := s.db.Create(&wallet).Error; err != nil {
		return nil, err
	}

	// Create default settings and limits
	s.createDefaultSettings(userID)
	s.createDefaultLimits(userID)

	return &wallet, nil
}

func (s *WalletService) createDefaultSettings(userID uuid.UUID) {
	settings := core.WalletSetting{ID: uuid.New(), UserID: userID}
	s.db.Create(&settings)
}

func (s *WalletService) createDefaultLimits(userID uuid.UUID) {
	limits := core.WalletLimit{ID: uuid.New(), UserID: userID}
	s.db.Create(&limits)
}

// GetBalance returns the balance from the provider
func (s *WalletService) GetBalance(ctx context.Context, userID uuid.UUID) (*ports.Balance, error) {
	wallet, err := s.EnsureWallet(ctx, userID)
	if err != nil {
		// Mock return for now if provider fails or no wallet, to not block UI
		return &ports.Balance{Available: "0.00", Currency: "USD"}, nil
	}

	balance, err := s.provider.GetBalance(ctx, wallet.ExternalID)
	if err != nil {
		// Fallback to cache
		return &ports.Balance{Available: wallet.Balance, Currency: wallet.Currency}, nil
	}

	// Update cache
	go func() {
		s.db.Model(wallet).Update("balance", balance.Available)
	}()

	return balance, nil
}

// --- Settings ---

func (s *WalletService) GetSettings(ctx context.Context, userID uuid.UUID) (*core.WalletSetting, error) {
	var settings core.WalletSetting
	err := s.db.Where("user_id = ?", userID).First(&settings).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		s.createDefaultSettings(userID)
		s.db.Where("user_id = ?", userID).First(&settings)
	} else if err != nil {
		return nil, err
	}
	return &settings, nil
}

func (s *WalletService) UpdateSettings(ctx context.Context, userID uuid.UUID, updates core.WalletSetting) (*core.WalletSetting, error) {
	var settings core.WalletSetting
	if err := s.db.Where("user_id = ?", userID).First(&settings).Error; err != nil {
		return nil, err
	}

	if err := s.db.Model(&settings).Updates(updates).Error; err != nil {
		return nil, err
	}
	return &settings, nil
}

// --- Limits ---

func (s *WalletService) GetLimits(ctx context.Context, userID uuid.UUID) (*core.WalletLimit, error) {
	var limits core.WalletLimit
	err := s.db.Where("user_id = ?", userID).First(&limits).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		s.createDefaultLimits(userID)
		s.db.Where("user_id = ?", userID).First(&limits)
	} else if err != nil {
		return nil, err
	}
	return &limits, nil
}

func (s *WalletService) UpdateLimits(ctx context.Context, userID uuid.UUID, updates core.WalletLimit) (*core.WalletLimit, error) {
	var limits core.WalletLimit
	if err := s.db.Where("user_id = ?", userID).First(&limits).Error; err != nil {
		return nil, err
	}
	if err := s.db.Model(&limits).Updates(updates).Error; err != nil {
		return nil, err
	}
	return &limits, nil
}

// --- Address Book ---

func (s *WalletService) GetContacts(ctx context.Context, userID uuid.UUID) ([]core.AddressBookEntry, error) {
	var contacts []core.AddressBookEntry
	if err := s.db.Where("user_id = ?", userID).Find(&contacts).Error; err != nil {
		return nil, err
	}
	return contacts, nil
}

func (s *WalletService) AddContact(ctx context.Context, userID uuid.UUID, contact core.AddressBookEntry) (*core.AddressBookEntry, error) {
	contact.ID = uuid.New()
	contact.UserID = userID
	if err := s.db.Create(&contact).Error; err != nil {
		return nil, err
	}
	return &contact, nil
}

// --- Security ---

func (s *WalletService) GetSecurityLogs(ctx context.Context, userID uuid.UUID) ([]core.SecurityLog, error) {
	var logs []core.SecurityLog
	if err := s.db.Where("user_id = ?", userID).Order("created_at desc").Limit(20).Find(&logs).Error; err != nil {
		return nil, err
	}
	return logs, nil
}

// --- Transactions ---

func (s *WalletService) GetTransactions(ctx context.Context, userID uuid.UUID) ([]core.Transaction, error) {
	wallet, err := s.EnsureWallet(ctx, userID)
	if err != nil {
		return nil, err
	}

	// sync with provider
	providerTxs, err := s.provider.GetTransactions(ctx, wallet.ExternalID)
	if err == nil {
		var txs []core.Transaction
		for _, pTx := range providerTxs {
			amount, _ := strconv.ParseFloat(pTx.Amount, 64)

			txs = append(txs, core.Transaction{
				WalletID:        wallet.ID,
				TransactionHash: pTx.TransactionHash,
				Amount:          amount,
				Currency:        pTx.Currency,
				FromAddress:     pTx.FromAddress,
				ToAddress:       pTx.ToAddress,
				CreatedAt:       pTx.Timestamp,
				Status:          core.TransactionStatusCompleted, // Assume completed for now
			})
		}
		// In a real app we'd merge/upsert these. For now just returning provider txs or DB fallback
		return txs, nil
	}

	// Fallback to local DB
	var txs []core.Transaction
	if err := s.db.Where("wallet_id = ?", wallet.ID).Order("created_at desc").Find(&txs).Error; err != nil {
		return nil, err
	}
	return txs, nil
}
