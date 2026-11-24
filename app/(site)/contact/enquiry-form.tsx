"use client";

import { useActionState, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from "lucide-react";
import { submitEnquiry } from "./actions";
import {
  SUBJECTS,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryState,
  type EnquiryValues,
} from "./validation";

const initialState: EnquiryState = { status: "idle" };

function readValues(form: HTMLFormElement): EnquiryValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    company: String(data.get("company") ?? ""),
    subject: String(data.get("subject") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [clientErrors, setClientErrors] = useState<EnquiryErrors | null>(null);
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = clientErrors ?? state.errors ?? {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateEnquiry(readValues(event.currentTarget));
    setTouched(true);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      const first = Object.keys(found)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors(null);
  }

  function handleChange() {
    if (touched && formRef.current) setClientErrors(validateEnquiry(readValues(formRef.current)));
  }

  if (state.status === "received") {
    return (
      <div role="status" className="border border-teal-600/30 bg-teal-300/10 p-8 md:p-10">
        <CheckCircle2 aria-hidden className="size-8 text-teal-700" />
        <h2 className="mt-5 text-2xl font-semibold text-navy-950">Thank you, your enquiry is valid.</h2>
        <p className="mt-4 leading-relaxed text-navy-700">{state.message}</p>
        <p className="mt-4 text-sm leading-relaxed text-navy-600">
          In production this step would deliver the enquiry through a transactional email provider or
          save it to a CRM.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 text-sm font-semibold text-navy-900 underline underline-offset-4 hover:text-teal-700"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const values = state.values;
  const showSummary = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      className="space-y-6"
    >
      <p className="flex gap-3 border-l-2 border-teal-500 bg-navy-50 px-4 py-3 text-sm leading-relaxed text-navy-700">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-700" />
        Demonstration form: entries are validated but not emailed or stored, because no email
        service is connected.
      </p>

      <div aria-live="polite">
        {showSummary && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-700">
            <AlertCircle aria-hidden className="size-4" />
            {state.message && !clientErrors ? state.message : "Please correct the highlighted fields."}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={values?.name}
            {...fieldProps("name", errors)}
          />
        </Field>
        <Field name="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email}
            {...fieldProps("email", errors)}
          />
        </Field>
        <Field name="company" label="Company" optional error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values?.company}
            {...fieldProps("company", errors)}
          />
        </Field>
        <Field name="subject" label="Subject" error={errors.subject}>
          <select
            id="subject"
            name="subject"
            defaultValue={values?.subject ?? ""}
            {...fieldProps("subject", errors)}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={values?.message}
          {...fieldProps("message", errors)}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2.5 bg-navy-900 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Checking
          </>
        ) : (
          <>
            Submit enquiry <Send aria-hidden className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

function fieldProps(name: EnquiryField, errors: EnquiryErrors) {
  const invalid = Boolean(errors[name]);
  return {
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? `${name}-error` : undefined,
    className: `block w-full border bg-white px-4 py-3 text-navy-950 transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${
      invalid ? "border-red-600 focus:border-red-600" : "border-navy-200 hover:border-navy-400 focus:border-navy-900"
    }`,
  };
}

function Field({
  name,
  label,
  optional = false,
  error,
  children,
}: {
  name: EnquiryField;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex justify-between text-sm font-medium text-navy-900">
        {label}
        {optional && <span className="font-normal text-navy-500">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
