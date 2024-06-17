import * as brevo from "@getbrevo/brevo";

export const brevoApiInstance = new brevo.TransactionalEmailsApi();
brevoApiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const sendSmtpEmail = new brevo.SendSmtpEmail();
