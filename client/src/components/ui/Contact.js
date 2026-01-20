import { useState } from "react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    // Handle success/error
  };
  return (
    <div>
      <section
        id="contact"
        className="px-4 py-20 transition-colors duration-300 lg:px-20"
      >
        <div className="mx-auto flex w-full flex-col items-start justify-between gap-12 md:flex-row">
          <div
            className="w-full md:w-5/12"
            style={{ opacity: 1, transform: "none" }}
          >
            <p className="mr-3 inline-block overflow-hidden text-5xl leading-tight text-zinc-900 md:text-6xl lg:mr-6 lg:mb-8 lg:text-8xl">
              {"Let's".split("").map((char, index) => (
                <span
                  key={index}
                  className="will-change-opacity inline-block transform font-sans font-bold will-change-transform"
                  style={{
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
            <p className="inline-block overflow-hidden text-5xl leading-tight font-bold text-zinc-900 md:text-6xl lg:mb-8 lg:text-8xl">
              {"Connect".split("").map((char, index) => (
                <span
                  key={index}
                  className="will-change-opacity inline-block transform font-sans font-bold will-change-transform"
                  style={{
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
            <p className="my-2 text-lg text-neutral-600 lg:mb-2 lg:text-2xl">
              Got a question or an idea? I'm just a message away—let's chat and
              bring it to life!
            </p>
          </div>
          <form className="w-full space-y-8 md:w-6/12" onSubmit={handleSubmit}>
            {[
              {
                name: "name",
                label: "Name*",
                type: "text",
                required: true,
                autoComplete: "name",
              },
              {
                name: "phone",
                label: "Phone (optional)",
                type: "tel",
                autoComplete: "tel",
              },
              {
                name: "email",
                label: "Email*",
                type: "email",
                required: true,
                autoComplete: "email",
              },
            ].map(({ name, label, type, required, autoComplete }) => (
              <div key={name} className="relative bg-pink-50">
                <input
                  type={type}
                  name={name}
                  required={required}
                  autoComplete={autoComplete}
                  inputMode={type === "tel" ? "tel" : undefined}
                  disabled={isSubmitting}
                  className="placeholder-pink-zinc-200 peer w-full border-b-2 border-pink-300 bg-transparent px-1 py-2 text-pink-800 focus:placeholder-transparent focus:outline-none disabled:opacity-50"
                  placeholder={label}
                />
                <label className="absolute -top-5 left-1 text-sm text-pink-200 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-pink-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-pink-300">
                  {label}
                </label>
              </div>
            ))}
            <div className="relative">
              <textarea
                name="message"
                required
                rows="2"
                autoComplete="off"
                disabled={isSubmitting}
                className="peer w-full resize-none border-b-2 border-pink-300 bg-transparent px-1 py-2 text-pink-800 placeholder-transparent transition-all focus:outline-none disabled:opacity-50"
                placeholder="Message"
              ></textarea>
              <label className="absolute -top-5 left-1 text-sm text-pink-200 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-pink-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-pink-300">
                Message*
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-black p-2 font-sans font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
