# ContactForm Component Documentation

## 1. Introduction

The `ContactForm` component is a fully functional user feedback and inquiry form. It allows users to send messages directly from the website by submitting their details such as name, email, phone number, subject, and message.

It includes form validation, loading state handling, success/error notifications, and API integration.

---

## 2. Purpose

The main objectives of this component are:

* To collect user inquiries and feedback
* To validate user input before submission
* To send data to backend via API service
* To provide real-time UI feedback (success/error/loading)
* To improve user engagement and communication

---

## 3. Technologies Used

* React (Functional Component)
* React Hooks (`useState`)
* Lucide React Icons (`Send`)
* Custom Service Layer (`contactService`)
* Custom Notification Hook (`useNotification`)
* Tailwind CSS (Styling)

---

## 4. Form Fields

| Field   | Type   | Required | Description        |
| ------- | ------ | -------- | ------------------ |
| name    | string | Yes      | User full name     |
| email   | string | Yes      | User email address |
| phone   | string | No       | Contact number     |
| subject | string | No       | Message subject    |
| message | string | Yes      | User message       |

---

## 5. State Management

The component uses multiple state variables:

* `formData` → Stores form input values
* `errors` → Stores validation errors
* `isSubmitting` → Tracks API submission state
* `submitSuccess` → Controls success message visibility

---

## 6. Form Validation

The form includes client-side validation:

### Validation Rules

* Name is required
* Email is required and must be valid format
* Message is required

### Error Handling

* Errors are displayed below each input field
* Invalid fields are highlighted with red borders

---

## 7. Form Submission Flow

### Step-by-step process:

1. User fills the form
2. User clicks “Send Message”
3. `validateForm()` runs

   * If invalid → errors shown
   * If valid → continue
4. `contactService.createContact()` API is called
5. While submitting:

   * Button shows loading spinner
   * Button gets disabled
6. On success:

   * Success notification is shown
   * Form is reset
   * Success message appears temporarily
7. On failure:

   * Error notification is shown

---

## 8. API Integration

The component uses:

```js
contactService.createContact({
  name,
  email,
  phone,
  subject,
  message
});
```

This service handles backend communication for storing contact messages.

---

## 9. UI & UX Features

* Responsive layout
* Real-time validation feedback
* Loading spinner during submission
* Success alert message
* Error message per field
* Disabled state during submission
* Smooth Tailwind-based styling

---

## 10. User Flow

1. User opens contact page
2. Fills form fields
3. Clicks “Send Message”
4. System validates input
5. Data is sent to backend
6. User receives success or error feedback

---

## 11. Error Handling

The component handles:

* Empty required fields
* Invalid email format
* API failure response
* Network issues

Errors are displayed using:

* Inline field messages
* Toast notifications (via `useNotification`)

---

## 12. Loading State Behavior

When form is submitting:

* Button becomes disabled
* Spinner icon is displayed
* Button text changes to “Sending…”

---

## 13. Success State Behavior

After successful submission:

* Success message appears
* Form is reset
* Message auto-hides after 5 seconds

---

## 14. Best Practices Followed

* Controlled form inputs
* Proper validation handling
* Separation of service layer (`contactService`)
* Reusable notification system
* Clean and readable UI
* Async error handling

---

## 15. Possible Improvements

* Add CAPTCHA verification
* Add auto-save draft functionality
* Add file attachment support
* Improve accessibility (ARIA labels)
* Add rate limiting on frontend
* Add form stepper for long forms

---

## 16. Conclusion

The `ContactForm` component is a robust and user-friendly communication module that ensures reliable message submission with proper validation, error handling, and user feedback. It improves user engagement and provides a structured way for users to reach out to the platform.
