import { validateEmail } from "@/utils/validation";
export async function registerForm(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  if (!username || !email || !password || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }
  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    throw new Error("Please enter a valid email address.");
  }
  //ADD the registration logic here, e.g., calling an API endpoint
}
