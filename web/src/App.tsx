import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ActivityFeed from './pages/ActivityFeed';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotificationsPage from './pages/NotificationsPage';
import PayrollDashboard from './pages/PayrollDashboard';
import PayrollNewBatch from './pages/PayrollNewBatch';
import PayrollUpload from './pages/PayrollUpload';
import PayrollReview from './pages/PayrollReview';
import PayrollManualEntry from './pages/PayrollManualEntry';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import OnboardingStep1 from './pages/OnboardingStep1';
import OnboardingStep2 from './pages/OnboardingStep2';
import OnboardingStep3 from './pages/OnboardingStep3';
import DocumentUpload from './pages/DocumentUpload';
import VerificationPending from './pages/VerificationPending';
import VerificationSuccess from './pages/VerificationSuccess';
import ManualReview from './pages/ManualReview';
import KYCAdditionalInfo from './pages/KYCAdditionalInfo';
import WalletFunding from './pages/WalletFunding';
import FirstPayrollSetup from './pages/FirstPayrollSetup';
import PayrollBatchPreview from './pages/PayrollBatchPreview';
import OnboardingCelebration from './pages/OnboardingCelebration';
import SaveProgress from './pages/SaveProgress';
import TwoFactorAuth from './pages/TwoFactorAuth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordSuccess from './pages/ResetPasswordSuccess';
import ResetLinkExpired from './pages/ResetLinkExpired';
import SSOSignIn from './pages/SSOSignIn';
import SSOCallback from './pages/SSOCallback';
import SSORedirect from './pages/SSORedirect';
import SSONotConfigured from './pages/SSONotConfigured';
import SessionExpired from './pages/SessionExpired';
import QuickReauth from './pages/QuickReauth';
import SessionWarning from './pages/SessionWarning';
import AccountLocked from './pages/AccountLocked';
import AccountSuspended from './pages/AccountSuspended';
import NetworkError from './pages/NetworkError';
import DeviceTrust from './pages/DeviceTrust';
import DeviceManagement from './pages/DeviceManagement';
import MagicLinkRequest from './pages/MagicLinkRequest';
import MagicLinkSent from './pages/MagicLinkSent';
import PayrollConfirmation from './pages/PayrollConfirmation';
import PayrollExecution from './pages/PayrollExecution';
import PayrollSuccess from './pages/PayrollSuccess';
import PayrollBatchDetail from './pages/PayrollBatchDetail';
import MagicLinkSuccess from './pages/MagicLinkSuccess';
import BatchValidationFailed from './pages/BatchValidationFailed';
import OnboardingHome from './pages/OnboardingHome';
import WalletEmptyState from './pages/WalletEmptyState';
import TeamInvitation from './pages/TeamInvitation';
import AccessRestricted from './pages/AccessRestricted';
import StatusPage from './pages/StatusPage';
import WalletDashboard from './pages/WalletDashboard';
import WalletSettings from './pages/WalletSettings';
import WalletLimits from './pages/WalletLimits';
import MultiNetworkWallet from './pages/MultiNetworkWallet';
import CrossNetworkBridge from './pages/CrossNetworkBridge';
import TransactionHistory from './pages/TransactionHistory';
import WalletSecurity from './pages/WalletSecurity';
import AddressBook from './pages/AddressBook';
import WalletAnalytics from './pages/WalletAnalytics';

import TeamManagement from './pages/TeamManagement';
import RolesOverview from './pages/RolesOverview';
import CreateRole from './pages/CreateRole';

import AdminLayout from './components/AdminLayout';
import AdminUsers from './pages/admin/Users';
import AdminCompliance from './pages/admin/Compliance';
import AdminTransactions from './pages/admin/Transactions';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/activity" element={<ActivityFeed />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/payroll" element={<PayrollDashboard />} />
                <Route path="/payroll/new" element={<PayrollNewBatch />} />
                <Route path="/payroll/upload" element={<PayrollUpload />} />
                <Route path="/payroll/manual" element={<PayrollManualEntry />} />
                <Route path="/payroll/review" element={<PayrollReview />} />
                <Route path="/payroll/confirm" element={<PayrollConfirmation />} />
                <Route path="/payroll/execute" element={<PayrollExecution />} />
                <Route path="/payroll/success" element={<PayrollSuccess />} />
                <Route path="/payroll/batch/:id" element={<PayrollBatchDetail />} />
                <Route path="/payroll/validation-failed" element={<BatchValidationFailed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
                <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
                <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
                <Route path="/onboarding/document-upload" element={<DocumentUpload />} />
                <Route path="/verification/pending" element={<VerificationPending />} />
                <Route path="/verification/success" element={<VerificationSuccess />} />
                <Route path="/verification/manual-review" element={<ManualReview />} />
                <Route path="/verification/additional-info" element={<KYCAdditionalInfo />} />
                <Route path="/wallet/funding" element={<WalletFunding />} />
                <Route path="/payroll/first-setup" element={<FirstPayrollSetup />} />
                <Route path="/payroll/preview" element={<PayrollBatchPreview />} />
                <Route path="/onboarding/celebration" element={<OnboardingCelebration />} />
                <Route path="/onboarding/save-progress" element={<SaveProgress />} />
                <Route path="/verify-2fa" element={<TwoFactorAuth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password/success" element={<ResetPasswordSuccess />} />
                <Route path="/reset-password/expired" element={<ResetLinkExpired />} />
                <Route path="/sso-login" element={<SSOSignIn />} />
                <Route path="/sso-redirect" element={<SSORedirect />} />
                <Route path="/auth/callback" element={<SSOCallback />} />
                <Route path="/sso-error" element={<SSONotConfigured />} />
                <Route path="/session-expired" element={<SessionExpired />} />
                <Route path="/quick-reauth" element={<QuickReauth />} />
                <Route path="/session-warning" element={<SessionWarning />} />
                <Route path="/account-locked" element={<AccountLocked />} />
                <Route path="/account-suspended" element={<AccountSuspended />} />
                <Route path="/network-error" element={<NetworkError />} />
                <Route path="/device-trust" element={<DeviceTrust />} />
                <Route path="/device-management" element={<DeviceManagement />} />
                <Route path="/magic-link" element={<MagicLinkRequest />} />
                <Route path="/magic-link-sent" element={<MagicLinkSent />} />
                <Route path="/magic-link-success" element={<MagicLinkSuccess />} />
                <Route path="/onboarding/home" element={<OnboardingHome />} />
                <Route path="/wallet/empty" element={<WalletEmptyState />} />
                <Route path="/employees/invite" element={<TeamInvitation />} />
                <Route path="/settings/roles" element={<RolesOverview />} />
                <Route path="/settings/roles/create" element={<CreateRole />} />
                <Route path="/403" element={<AccessRestricted />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/wallets" element={<WalletDashboard />} />
                <Route path="/settings" element={<WalletSettings />} />
                <Route path="/settings/limits" element={<WalletLimits />} />
                <Route path="/wallets/networks" element={<MultiNetworkWallet />} />
                <Route path="/bridge" element={<CrossNetworkBridge />} />
                <Route path="/history" element={<TransactionHistory />} />
                <Route path="/security" element={<WalletSecurity />} />
                <Route path="/contacts" element={<AddressBook />} />
                <Route path="/analytics" element={<WalletAnalytics />} />
                <Route path="/employees" element={<TeamManagement />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<div className="text-white">Admin Dashboard Overview - Select a section from the sidebar.</div>} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="compliance" element={<AdminCompliance />} />
                    <Route path="transactions" element={<AdminTransactions />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
