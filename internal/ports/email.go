package ports

// EmailSender defines the interface for sending emails
type EmailSender interface {
	SendEmail(to, subject, body string) error
	SendTemplateEmail(to string, templateID string, data map[string]interface{}) error
}
