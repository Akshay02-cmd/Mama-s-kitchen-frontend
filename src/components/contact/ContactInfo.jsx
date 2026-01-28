import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@mamaskitchen.com", "support@mamaskitchen.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Kitchen Street", "Nashik, Maharashtra"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9:00 AM - 9:00 PM", "Sat-Sun: 10:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-white border border-amber-600/20">
        <h2 className="text-3xl font-serif font-bold mb-3 text-amber-400">
          Contact Information
        </h2>
        <p className="text-slate-300 mb-8">We're here to help you with any questions</p>
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex gap-5 p-4 rounded-xl hover:bg-white/10 transition-all group">
              <div className="shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-400 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-200">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-72 border border-slate-100">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center text-slate-600">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-amber-600" />
            </div>
            <p className="font-bold text-lg text-slate-900">Our Location</p>
            <p className="text-sm">123 Kitchen Street, Nashik</p>
            <p className="text-sm">Maharashtra, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
