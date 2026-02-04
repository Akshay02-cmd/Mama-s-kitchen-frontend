import { ContactHeader, ContactForm, ContactInfo } from "../components/contact";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <ContactHeader />

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;