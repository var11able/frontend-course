import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">Contact us</h1>
        <p className="mt-4 text-lg text-stone-600">
          Questions about a product or an order? Send us a message and we&apos;ll get back to you
          within one business day.
        </p>

        <dl className="mt-8 flex flex-col gap-5 text-sm">
          <div>
            <dt className="text-stone-500">Email</dt>
            <dd className="mt-1 font-medium text-stone-900">hello@showcase.example</dd>
          </div>
          <div>
            <dt className="text-stone-500">Phone</dt>
            <dd className="mt-1 font-medium text-stone-900">+62 21 555 0123</dd>
          </div>
          <div>
            <dt className="text-stone-500">Hours</dt>
            <dd className="mt-1 font-medium text-stone-900">Monday to Friday, 09:00 to 17:00</dd>
          </div>
        </dl>
      </section>

      <ContactForm />
    </div>
  );
}
