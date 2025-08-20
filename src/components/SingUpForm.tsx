"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hook/useAuth";

const SingUpForm = () => {
  const { signup } = useAuth();
  const [formMsg, setFormMsg] = useState<{
    message: string;
    status?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormLocked, setIsFormLocked] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMsg(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signup(formData);

      // Check if there's an error returned from the server action
      if (result?.error) {
        setIsLoading(false);
        setIsFormLocked(true);
        setFormMsg({ message: result.error });
        return;
      }

      // If no error, signup was successful and redirect will happen
      setIsLoading(false);
      setFormMsg({
        message: "Registration successful! Redirecting...",
        status: true,
      });
    } catch (error) {
      setIsLoading(false);
      setIsFormLocked(true);
      if (error instanceof Error) {
        setFormMsg({ message: error.message });
      } else {
        setFormMsg({ message: "An unknown error occurred." });
      }
    } finally {
      setTimeout(() => {
        handleInputInteraction();
      }, 2000);
    }
  };

  const handleInputInteraction = () => {
    setFormMsg(null);
    setIsFormLocked(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-3 bg-blue-2 shadow-lg mt-8 mb-8 p-8 rounded-2xl w-full max-w-md"
    >
      <h2 className="shadow-blue-5 mb-4 font-bold text-cst text-3xl">
        Sign Up
      </h2>
      <div className="flex flex-col mb-2 w-full">
        <label
          htmlFor="username"
          className="mb-1 font-medium text-blue-9 text-lg md:text-xl"
        >
          Username:
        </label>
        <input
          className="bg-blue-1 p-3 border border-blue-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-5 placeholder:text-blue-3 text-base transition"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={handleInputInteraction}
        />
        <label
          htmlFor="email"
          className="mb-1 font-medium text-blue-9 text-lg md:text-xl"
        >
          Email:
        </label>
        <input
          className="bg-blue-1 p-3 border border-blue-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-5 placeholder:text-blue-3 text-base transition"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleInputInteraction}
        />
      </div>
      <div className="relative flex flex-col w-full">
        <label
          htmlFor="password"
          className="flex flex-row justify-between items-center mb-1 font-medium text-blue-9 text-lg md:text-xl"
        >
          Password:
          <span
            onClick={togglePasswordVisibility}
            className="text-blue-8 hover:text-white text-base hover:underline cursor-pointer"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        </label>
        <input
          className="bg-blue-1 p-3 border border-blue-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-5 placeholder:text-blue-3 text-base transition"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password (min 6 characters)"
          onChange={handleInputInteraction}
        />
      </div>
      <div className="relative flex flex-col w-full">
        <label
          htmlFor="confirmPassword"
          className="mb-1 font-medium text-blue-9 text-lg md:text-xl"
        >
          Confirm Password:
        </label>
        <input
          className="bg-blue-1 p-3 border border-blue-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-5 placeholder:text-blue-3 text-base transition"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={handleInputInteraction}
        />
      </div>
      {formMsg && (
        <div className="bg-red-100 shadow-sm my-2 px-4 py-2 border border-red-400 rounded-lg w-full text-red-700 text-center">
          {formMsg.message}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading || isFormLocked}
        className="bg-blue-8 hover:bg-blue-9 disabled:bg-blue-2 mb-2 py-3 rounded-xl w-full font-semibold text-white transition"
      >
        Sign Up
      </button>
      <Link
        href={"/login"}
        className="w-full text-blue-8 hover:text-white text-base text-center"
      >
        Already have an account? Log in here.
      </Link>
    </form>
  );
};

export default SingUpForm;
