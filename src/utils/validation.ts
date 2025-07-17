export interface FeedbackFormData {
  username: string;
  email: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  return emailPattern.test(email.trim());
};

export const validateFeedbackForm = (data: FeedbackFormData): string | null => {
  const { username, email, message } = data;

  if (!username?.trim() || !email?.trim() || !message?.trim()) {
    return "Please fill in all fields.";
  }

  if (!validateEmail(email)) {
    return "Please enter a valid email address.";
  }

  return null;
};
