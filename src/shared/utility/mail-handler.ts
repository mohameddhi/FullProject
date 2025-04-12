import axios from 'axios';
import config from 'config';

export const sendEmail = async (
  to: string,
  templateName: string,
  subject: string,
  templateVars: Record<string, any> = {},
) => {
  try {
    // Vérifiez que la clé API existe
    const apiKey = config.get<string>('emailService.apiKey');
    const templateId = config.get<number>(`emailService.emailTemplates.${templateName}`);

    if (!apiKey) {
      throw new Error('API Key for email service is missing in configuration.');
    }

    if (!templateId) {
      throw new Error(`Template '${templateName}' not found in configuration.`);
    }

    const emailData = {
      sender: { email: 'valomnia@gmail.com' },
      to: [{ email: to }],
      subject: subject,
      templateId: templateId,
      params: templateVars,
    };

    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', emailData, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('Email sent successfully:', response.data);
    return response;
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

