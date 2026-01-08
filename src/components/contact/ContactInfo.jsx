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
      details: ["123 Kitchen Street", "Food City, FC 12345"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9:00 AM - 9:00 PM", "Sat-Sun: 10:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Contact Information
        </h2>
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-64">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Map Location</p>
            <p className="text-sm">123 Kitchen Street, Food City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
