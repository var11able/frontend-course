"use client";

import { useState } from "react";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10";

export default function ContactForm() {
  const [sentTo, setSentTo] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSentTo(form.get("name"));
  }

  if (sentTo) {
    return (
      <div className="rounded-3xl bg-white p-8 ring-1 ring-stone-200" role="status">
        <h2 className="text-xl font-semibold text-stone-900">Thanks, {sentTo}!</h2>
        <p className="mt-2 text-stone-600">Your message is on its way. We&apos;ll reply soon.</p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-6 text-sm font-medium text-stone-600 underline hover:text-stone-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-stone-200 sm:p-8"
    >
      <label className="block text-sm font-medium text-stone-700">
        Name
        <input name="name" required autoComplete="name" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-stone-700">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-stone-700">
        Message
        <textarea name="message" required rows={5} className={inputClass} />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-6 font-medium text-white transition-colors hover:bg-stone-700 sm:self-start"
      >
        Send message
      </button>
    </form>
  );
}
