export const SUBJECTS = [
  "Strategy & advisory",
  "Digital transformation",
  "Data & analytics",
  "Partnership opportunity",
  "Media enquiry",
  "Other",
] as const;

export type EnquiryField = "name" | "email" | "company" | "subject" | "message";
export type EnquiryValues = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryState = {
  status: "idle" | "error" | "received";
  message?: string;
  errors?: EnquiryErrors;
  values?: EnquiryValues;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.company.trim().length > 120) errors.company = "Company name is too long.";
  if (!SUBJECTS.includes(values.subject as (typeof SUBJECTS)[number]))
    errors.subject = "Please choose a subject.";
  const length = values.message.trim().length;
  if (length < 20) errors.message = "Please tell us a little more (at least 20 characters).";
  else if (length > 3000) errors.message = "Please keep your message under 3,000 characters.";
  return errors;
}
