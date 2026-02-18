package email

import (
	"errors"
	"fmt"
	"log"

	"velo/internal/ports"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type SendGridAdapter struct {
	client    *sendgrid.Client
	fromName  string
	fromEmail string
}

func NewSendGridAdapter(apiKey, fromName, fromEmail string) (ports.EmailSender, error) {
	if apiKey == "" {
		return nil, errors.New("sendgrid api key is required")
	}
	return &SendGridAdapter{
		client:    sendgrid.NewSendClient(apiKey),
		fromName:  fromName,
		fromEmail: fromEmail,
	}, nil
}

func (s *SendGridAdapter) SendEmail(to, subject, body string) error {
	from := mail.NewEmail(s.fromName, s.fromEmail)
	toEmail := mail.NewEmail("", to)
	message := mail.NewSingleEmail(from, subject, toEmail, body, body) // Using body for both plain and HTML for simplicity now

	response, err := s.client.Send(message)
	if err != nil {
		log.Printf("Failed to send email to %s: %v", to, err)
		return err
	}

	if response.StatusCode >= 400 {
		return fmt.Errorf("sendgrid error: status %d, body %s", response.StatusCode, response.Body)
	}

	return nil
}

func (s *SendGridAdapter) SendTemplateEmail(to string, templateID string, data map[string]interface{}) error {
	from := mail.NewEmail(s.fromName, s.fromEmail)
	toEmail := mail.NewEmail("", to)
	message := mail.NewV3Mail()
	message.SetFrom(from)
	message.SetTemplateID(templateID)

	p := mail.NewPersonalization()
	p.AddTos(toEmail)

	for k, v := range data {
		p.SetDynamicTemplateData(k, v)
	}

	message.AddPersonalizations(p)

	response, err := s.client.Send(message)
	if err != nil {
		log.Printf("Failed to send template email to %s: %v", to, err)
		return err
	}

	if response.StatusCode >= 400 {
		return fmt.Errorf("sendgrid error: status %d, body %s", response.StatusCode, response.Body)
	}

	return nil
}
