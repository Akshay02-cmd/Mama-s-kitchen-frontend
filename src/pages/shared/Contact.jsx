import { ContactHeader, ContactForm, ContactInfo } from "../../components/shared";

const Contact = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-50">
      <ContactHeader />

      {/* Contact Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;