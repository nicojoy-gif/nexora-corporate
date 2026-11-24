"use server";

import { validateEnquiry, type EnquiryState, type EnquiryValues } from "./validation";

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values: EnquiryValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
      values,
    };
  }

  return {
    status: "received",
    message:
      "Your enquiry passed validation on the server. This is a demonstration site with no email service connected, so the message has not been sent or stored.",
  };
}
