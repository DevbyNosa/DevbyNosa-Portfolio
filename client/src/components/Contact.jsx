import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import axios from "axios";

export default function Contact({ content = {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "" | "success" | "error"
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  async function handleMessage(e) {
    e.preventDefault();

    if (sending) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Please fill in all fields.");
      return;
    }

    setSending(true);
    setStatus("");
    setFeedback("");

    try {
      const res = await axios.post("/api/admin/messages", {
        name,
        email,
        message,
      });

      const data = res.data;

      if (data.success) {
        setStatus("success");
        setFeedback(data.message || "Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => {
          setFeedback("")
        }, 5000)
      } else {
        setStatus("error");
        setFeedback(data.message || "Something went wrong.");

          setTimeout(() => {
          setFeedback("")
        }, 5000)
      }
    } catch (err) {
      console.error("[contact] send failed:", err);
      setStatus("error");
      setFeedback(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to send. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto my-[150px] w-[90%] max-w-[1200px] border-t border-[#d8d7d2] pt-[45px]"
    >
      <div className="grid gap-[70px] md:grid-cols-[.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            {content.eyebrow || "06 — LET'S TALK"}
          </p>

          <h2 className="mt-[10px] max-w-[500px] font-['Space_Grotesk'] text-[45px] font-medium leading-[1] tracking-[-2px] md:text-[50px]">
            {content.title || "Let's build something good."}
          </h2>

          <p className="mt-[25px] max-w-[420px] text-[16px] leading-[1.8] text-[#686868]">
            {content.description || "Have a project in mind, an idea you want to bring to life, or just want to talk about building something?"}
          </p>

          <motion.a
            href="mailto:judgesnigbinosa@gmail.com"
            className="mt-[30px] inline-flex items-center gap-3 border-b border-[#171717] pb-2 font-['Space_Grotesk'] text-[18px] font-medium transition-colors hover:text-[#315bea]"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Mail size={19} strokeWidth={1.8} />
            {content.email || "judgesnigbinosa@gmail.com"}
            <ArrowUpRight size={18} strokeWidth={1.8} />
          </motion.a>

          <div className="mt-[45px] flex gap-[20px]">
            <motion.a
              href="https://github.com/DevbyNosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaGithub size={22} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/devbynosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaLinkedin size={22} />
            </motion.a>

            <motion.a
              href="https://x.com/DevByNosa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaXTwitter size={22} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-[#d8d7d2] pt-[30px]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <form onSubmit={handleMessage}>
            <div className="grid gap-[25px] md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[12px] font-semibold tracking-[1px] text-[#686868]"
                >
                  YOUR NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[16px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={sending}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[12px] font-semibold tracking-[1px] text-[#686868]"
                >
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[16px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                />
              </div>
            </div>

            <div className="mt-[30px]">
              <label
                htmlFor="message"
                className="mb-2 block text-[12px] font-semibold tracking-[1px] text-[#686868]"
              >
                TELL ME ABOUT IT
              </label>

              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me a little about your project..."
                className="w-full resize-none border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[16px] leading-[1.7] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sending}
              />
            </div>

            {feedback && (
              <p
                className={`mt-4 text-[14px] ${
                  status === "success"
                    ? "text-[#3f8f5c]"
                    : "text-[#c14545]"
                }`}
              >
                {feedback}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={sending}
              className="mt-[30px] inline-flex items-center gap-3 bg-[#171717] px-[22px] py-[16px] text-[15px] font-semibold text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={sending ? {} : { y: -3 }}
              whileTap={sending ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {sending ? "Sending…" : "Send message"}
              <Send size={17} strokeWidth={2} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}