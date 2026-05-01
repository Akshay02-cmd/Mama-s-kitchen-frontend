# ContactInfo Component Documentation

## 1. Introduction

The `ContactInfo` component is a structured information section used on the Contact page to display key business contact details such as phone numbers, email addresses, physical address, and operating hours.

It also includes a visual map placeholder to represent the business location.

---

## 2. Purpose

The main objectives of this component are:

* To provide users with quick access to contact details
* To display business communication channels clearly
* To improve trust and transparency
* To visually enhance the Contact page with a map section

---

## 3. Technologies Used

* React (Functional Component)
* Lucide React Icons
* Tailwind CSS (Styling)
* Array-based dynamic rendering

---

## 4. Contact Information Structure

The component displays four main sections:

### 4.1 Phone

* Multiple contact numbers
* Used for direct communication

### 4.2 Email

* Support and general inquiry emails

### 4.3 Address

* Physical location of the business

### 4.4 Working Hours

* Business operating schedule

---

## 5. Data Structure

Contact information is stored in an array:

```js
const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
  },
  ...
];
```

This allows easy scalability and maintenance.

---

## 6. UI & Design Features

### 6.1 Main Card Section

* Dark gradient background
* Rounded corners for modern UI
* Amber accent color theme
* Hover animation effects

### 6.2 Icon Container

* Gradient circular icon background
* Smooth hover scaling effect
* Shadow for depth

### 6.3 Typography

* Section title in bold amber color
* Supporting text in muted gray
* Clear hierarchy for readability

---

## 7. Map Section

### 7.1 Purpose

The map section acts as a placeholder for future integration of Google Maps or similar services.

### 7.2 Features

* Clean placeholder design
* Location icon display
* Address preview text
* Center-aligned layout

---

## 8. User Flow

1. User opens Contact page
2. Views contact information panel
3. Reads phone, email, and address details
4. Checks working hours
5. Optionally views map section for location context

---

## 9. UI Behavior

* Hover effects on each contact item
* Smooth scaling animation on icons
* Responsive layout for all screen sizes
* Clean separation between sections

---

## 10. Accessibility Considerations

* Icons improve visual understanding
* Structured headings for readability
* High contrast text on dark background
* Clear grouping of related information

---

## 11. Best Practices Followed

* Dynamic rendering using array mapping
* Reusable data structure
* Clean separation of concerns
* Consistent UI styling system
* Scalable design for future updates

---

## 12. Possible Improvements

* Integrate Google Maps API for live location
* Add click-to-call functionality for phone numbers
* Add mailto links for email addresses
* Add WhatsApp quick contact button
* Make contact data dynamic via backend API

---

## 13. Conclusion

The `ContactInfo` component provides a clean and structured way to display essential business contact details. It enhances user trust, improves accessibility, and serves as a key informational section on the Contact page.
