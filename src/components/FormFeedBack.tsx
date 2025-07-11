"use client";
export default function FormFeedBack() {
  const submitFeedBack = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
  };
  return (
    <form
      onSubmit={submitFeedBack}
      className="flex flex-col flex-2 items-center gap-4 h-[100%]"
    >
      <div className="flex flex-row gap-25 w-full">
        <span className="flex flex-col flex-1">
          <label htmlFor="username" className="m-2 text-blue-9 text-3xl">
            Username:
          </label>
          <input
            className="bg-blue-1 p-2 border-4 border-white rounded-2xl placeholder:text-blue-2"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </span>

        <span className="flex flex-col flex-1">
          <label htmlFor="email" className="m-2 text-blue-9 text-3xl">
            Email:
          </label>
          <input
            className="bg-blue-1 p-2 border-4 border-white rounded-2xl placeholder:text-blue-2"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </span>
      </div>
      <span className="flex flex-col w-full">
        <label htmlFor="message" className="m-2 text-blue-9 text-3xl">
          Message:
        </label>
        <textarea
          className="bg-blue-1 p-2 border-4 border-white rounded-2xl w-[32vw] h-[20vh] placeholder:text-blue-2 resize-none"
          id="message"
          name="message"
          rows={10}
          placeholder="Enter your feedback or message"
        ></textarea>
      </span>
      <button
        type="submit"
        className="bg-blue-9 hover:bg-blue-8 mt-4 mb-10 px-4 pt-1 lg:pt-3 pb-2 lg:pb-4 rounded-2xl text-md text-white sm:text-2xl md:text-3xl lg:text-4xl active:scale-110 transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}
