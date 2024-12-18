"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_fehfykt", 
        "template_wk3jz8m", 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "hD8pRTXUu_AXwtp6-" 
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <title>Support</title>

      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl"
      >

        <div className="mb-6">
          <label
            className="block text-gray-600 text-lg font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            className="block text-gray-600 text-lg font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>


        <div className="mb-6">
          <label
            className="block text-gray-600 text-lg font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message here"
            rows={6}
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>


      {status && (
        <p className="mt-6 text-lg font-medium text-gray-700">{status}</p>
      )}
    </div>
  );
};

export default ContactPage;
