import React, { useEffect, useState } from "react";
import axios from "axios";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
        if (res.data.success) {
          setFaqs(res.data.data.faq);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setFaqs([
          { question: "What is your return policy?", answer: "You can return within 30 days." },
          { question: "How do I reset my password?", answer: "Use the forgot password link." },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleAdd = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemove = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}admin/faq`, { faqs });
      if (res.data.success) {
        setMessage({ type: "success", text: "FAQs saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save FAQs." });
      }
    } catch (err) {
      console.error("Error saving FAQs:", err);
      setMessage({ type: "error", text: "An error occurred while saving FAQs." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading FAQs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">FAQ Management</h1>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white shadow-sm relative">
            <label className="block mb-1 font-semibold text-gray-700">Question:</label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter the question"
            />

            <label className="block mt-4 mb-1 font-semibold text-gray-700">Answer:</label>
            <textarea
              value={faq.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring focus:ring-indigo-200"
              rows={4}
              placeholder="Enter the answer"
            />

            <button
              onClick={() => handleRemove(index)}
              type="button"
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold rounded focus:outline-none"
              aria-label="Remove FAQ"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          onClick={handleAdd}
          className="block mx-auto mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition"
          type="button"
        >
          + Add FAQ
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 rounded font-semibold text-white shadow-md transition ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? "Saving..." : "Save FAQs"}
        </button>
      </div>
    </div>
  );
};

export default Faq;
