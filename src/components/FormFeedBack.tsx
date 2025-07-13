'use client';
import axios from 'axios';
import { useState } from 'react';
import {validateFeedbackForm,FeedbackFormData} from '@/utils/validation';

export default function FeedbackForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const submitFeedBack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage('');


    const formData = new FormData(e.target as HTMLFormElement );
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }
    const valFormData = validateFeedbackForm(data as FeedbackFormData);

    if (valFormData) {
      setMessage(valFormData);
      setIsPending(false);
      
      setTimeout(() => {
      setMessage('');
      }, 3000);
      return;
    }
 
    try {
      await axios.post('https://usebasin.com/f/76c33849d82a', data);

      setMessage('Feedback submitted successfully!');

      (e.target as HTMLFormElement).reset();

      setTimeout(() => {
      setMessage('');
      }, 3000);
    } catch {
      setMessage('Failed to send feedback. Please try again.');

       setTimeout(() => {
      setMessage('');
      }, 3000);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={submitFeedBack}
      className="flex flex-col gap-6 w-full max-w-md sm:max-w-lg"
    >
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="username" className="mb-2 text-blue-9 text-lg md:text-2xl">
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
          <label htmlFor="email" className="mb-2 text-blue-9 text-lg md:text-2xl">
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
        <label htmlFor="message" className="mb-2 text-blue-9 text-lg md:text-2xl">
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
        disabled={isPending}
        className="bg-blue-9 hover:bg-blue-8 disabled:bg-blue-6 px-6 py-3 rounded-xl font-semibold text-white text-lg sm:text-xl md:text-2xl active:scale-95 transition-transform disabled:cursor-not-allowed transform"
      >
        {isPending ? 'Sending...' : 'Submit'}
      </button>

      {message && (
        <p className="font-medium text-blue-8 text-sm text-center">{message}</p>
      )}
    </form>
  );
}
