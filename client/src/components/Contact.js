const Contact = () => {
  return (
    <div>
      <section
        id="contact"
        className="py-20     px-4 lg:px-20 transition-colors duration-300"
      >
        <div className="w-full flex justify-between flex-col md:flex-row mx-auto items-start gap-12">
          <div
            className="w-full md:w-5/12"
            style={{ opacity: 1, transform: "none" }}
          >
            <p className="inline-block overflow-hidden text-zinc-900  text-5xl md:text-6xl lg:text-8xl  leading-tight lg:mr-6 lg:mb-8 mr-3">
              {"Let's".split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block transform will-change-transform will-change-opacity font-sans font-bold"
                  style={{
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
            <p className="inline-block overflow-hidden text-zinc-900  text-5xl md:text-6xl lg:text-8xl font-bold leading-tight lg:mb-8">
              {"Connect".split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block transform will-change-transform will-change-opacity font-sans font-bold"
                  style={{
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
            <p className="text-neutral-600   text-lg lg:text-2xl my-2 lg:mb-2">
              Got a question or an idea? I'm just a message away—let's chat and
              bring it to life!
            </p>
          </div>
          <form className="w-full md:w-6/12 space-y-8 ">
            {[
              { name: "name", label: "Name*", type: "text", required: true },
              { name: "phone", label: "Phone (optional)", type: "tel" },
              { name: "email", label: "Email*", type: "email", required: true },
            ].map(({ name, label, type, required }) => (
              <div key={name} className="relative bg-pink-50 ">
                <input
                  type={type}
                  name={name}
                  required={required}
                  className="peer w-full border-b-2 border-pink-300  bg-transparent py-2 px-1  text-pink-800 placeholder-pink-zinc-200    focus:outline-none focus:placeholder-transparent"
                  placeholder={label}
                />
                <label className="absolute left-1 -top-5 text-pink-200 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-pink-400   peer-focus:-top-5 peer-focus:text-sm peer-focus:text-pink-300   ">
                  {label}
                </label>
              </div>
            ))}
            <div className="relative   ">
              <textarea
                name="message"
                required
                rows="2"
                className="peer w-full border-b-2 border-pink-300  bg-transparent py-2 px-1 text-pink-800 placeholder-transparent    focus:outline-none transition-all resize-none "
                placeholder="Message"
              ></textarea>
              <label className="absolute left-1 -top-5 text-pink-200 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-pink-400   peer-focus:-top-5 peer-focus:text-sm peer-focus:text-pink-300   ">
                Message*
              </label>
            </div>
            <button
              type="submit"
              className="rounded bg-black text-white p-2 font-sans font-bold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
