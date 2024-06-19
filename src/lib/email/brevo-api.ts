import * as brevo from "@getbrevo/brevo";

export const brevoApiInstance = new brevo.TransactionalEmailsApi();
brevoApiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const brevoContactsInstance = new brevo.ContactsApi();
brevoContactsInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const sendSmtpEmail = new brevo.SendSmtpEmail();
export const createContact = new brevo.CreateContact();
