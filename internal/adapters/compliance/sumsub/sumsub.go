package sumsub

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
)

type SumsubAdapter struct {
	baseURL    string
	appToken   string
	secretKey  string
	levelName  string
	simulation bool
}

func NewSumsubAdapter(appToken, secretKey, levelName string, simulation bool) *SumsubAdapter {
	return &SumsubAdapter{
		baseURL:    "https://api.sumsub.com",
		appToken:   appToken,
		secretKey:  secretKey,
		levelName:  levelName,
		simulation: simulation,
	}
}

// CreateApplicant creates a new applicant in Sumsub
func (a *SumsubAdapter) CreateApplicant(externalUserID string, levelName string) (string, error) {
	if a.simulation {
		return "mock_applicant_" + externalUserID, nil
	}

	if levelName == "" {
		levelName = a.levelName
	}

	path := "/resources/applicants?levelName=" + levelName
	method := "POST"

	body := map[string]string{
		"externalUserId": externalUserID,
	}
	payload, _ := json.Marshal(body)

	respBody, err := a.makeRequest(method, path, payload)
	if err != nil {
		return "", err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return "", err
	}

	if id, ok := result["id"].(string); ok {
		return id, nil
	}
	return "", fmt.Errorf("failed to parse applicant ID")
}

// GetApplicantStatus gets the review status of an applicant
func (a *SumsubAdapter) GetApplicantStatus(applicantID string) (string, error) {
	if a.simulation {
		// Simulate standard flow:
		// If ID starts with "mock_applicant_", return "green" (approved)
		// Otherwise "init"
		if strings.HasPrefix(applicantID, "mock_applicant_") {
			return "green", nil
		}
		return "init", nil
	}

	path := fmt.Sprintf("/resources/applicants/%s/status", applicantID)
	respBody, err := a.makeRequest("GET", path, nil)
	if err != nil {
		return "", err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return "", err
	}

	// Sumsub returns { "review": { "reviewStatus": "completed", "reviewResult": { "reviewAnswer": "GREEN" } } }
	if review, ok := result["review"].(map[string]interface{}); ok {
		if result, ok := review["reviewResult"].(map[string]interface{}); ok {
			if answer, ok := result["reviewAnswer"].(string); ok {
				return strings.ToLower(answer), nil
			}
		}
	}

	return "unknown", nil
}

// GenerateSDKToken generates an access token for the Web SDK
func (a *SumsubAdapter) GenerateSDKToken(applicantID string) (string, error) {
	if a.simulation {
		return "mock_sdk_token_" + uuid.New().String(), nil
	}

	path := fmt.Sprintf("/resources/accessTokens?userId=%s&ttlInSecs=1200", applicantID)
	respBody, err := a.makeRequest("POST", path, nil)
	if err != nil {
		return "", err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return "", err
	}

	if token, ok := result["token"].(string); ok {
		return token, nil
	}
	return "", fmt.Errorf("failed to parse SDK token")
}

func (a *SumsubAdapter) makeRequest(method, path string, body []byte) ([]byte, error) {
	client := &http.Client{}
	url := a.baseURL + path

	var reqBody io.Reader
	if body != nil {
		reqBody = strings.NewReader(string(body))
	}

	req, err := http.NewRequest(method, url, reqBody)
	if err != nil {
		return nil, err
	}

	ts := fmt.Sprintf("%d", time.Now().Unix())
	signature := a.signRequest(ts, method, path, body)

	req.Header.Add("X-App-Token", a.appToken)
	req.Header.Add("X-App-Access-Sig", signature)
	req.Header.Add("X-App-Access-Ts", ts)
	req.Header.Add("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		respBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("API error: %s - %s", resp.Status, string(respBytes))
	}

	return io.ReadAll(resp.Body)
}

func (a *SumsubAdapter) signRequest(ts, method, path string, body []byte) string {
	hash := hmac.New(sha256.New, []byte(a.secretKey))
	hash.Write([]byte(ts + method + path))
	if body != nil {
		hash.Write(body)
	}
	return hex.EncodeToString(hash.Sum(nil))
}
