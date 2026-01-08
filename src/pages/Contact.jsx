import { ContactHeader, ContactForm, ContactInfo } from "../components/contact";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <ContactHeader />

      {/* Contact Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;