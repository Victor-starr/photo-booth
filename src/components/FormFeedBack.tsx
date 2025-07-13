"use client";
import React from "react";

export default function FormFeedBack() {
  const submitFeedBack = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
  };

  return (
    <form
      onSubmit={submitFeedBack}
      className="flex flex-col gap-6 w-full md:w-full md:max-w-none max-w-md sm:max-w-lg"
    >
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="username"
            className="mb-2 text-blue-9 text-lg md:text-2xl"
          >
            Username:
          </label>
          <input
            className="bg-blue-1 p-3 border-2 border-white rounded-xl placeholder:text-blue-2 text-sm md:text-base"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="email"
            className="mb-2 text-blue-9 text-lg md:text-2xl"
          >
            Email:
          </label>
          <input
            className="bg-blue-1 p-3 border-2 border-white rounded-xl placeholder:text-blue-2 text-sm md:text-base"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="message"
          className="mb-2 text-blue-9 text-lg md:text-2xl"
        >
          Message:
        </label>
        <textarea
          className="bg-blue-1 p-3 border-2 border-white rounded-xl h-40 md:h-48 placeholder:text-blue-2 text-sm md:text-base resize-none"
          id="message"
          name="message"
          placeholder="Enter your feedback or message"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-9 hover:bg-blue-8 px-6 py-3 rounded-xl font-semibold text-white text-lg sm:text-xl md:text-2xl active:scale-95 transition-transform transform"
      >
        Submit
      </button>
    </form>
  );
}
