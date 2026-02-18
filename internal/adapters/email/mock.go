package email

import "sync"

type MockEmailSender struct {
	Mu            sync.Mutex
	SentEmails    []SentEmail
	SentTemplates []SentTemplateEmail
}

type SentEmail struct {
	To      string
	Subject string
	Body    string
}

type SentTemplateEmail struct {
	To         string
	TemplateID string
	Data       map[string]interface{}
}

func NewMockEmailSender() *MockEmailSender {
	return &MockEmailSender{
		SentEmails:    make([]SentEmail, 0),
		SentTemplates: make([]SentTemplateEmail, 0),
	}
}

func (m *MockEmailSender) SendEmail(to, subject, body string) error {
	m.Mu.Lock()
	defer m.Mu.Unlock()
	m.SentEmails = append(m.SentEmails, SentEmail{To: to, Subject: subject, Body: body})
	return nil
}

func (m *MockEmailSender) SendTemplateEmail(to string, templateID string, data map[string]interface{}) error {
	m.Mu.Lock()
	defer m.Mu.Unlock()
	m.SentTemplates = append(m.SentTemplates, SentTemplateEmail{To: to, TemplateID: templateID, Data: data})
	return nil
}
