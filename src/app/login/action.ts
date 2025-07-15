import { validateEmail } from "@/utils/validation";
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    throw new Error("Please enter a valid email address.");
  }

  //ADD the login logic here, e.g., calling an API endpoint
}
