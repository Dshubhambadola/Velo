package ports

type ComplianceProvider interface {
	CreateApplicant(externalUserID string, levelName string) (string, error)
	GetApplicantStatus(applicantID string) (string, error)
	GenerateSDKToken(applicantID string) (string, error)
}
