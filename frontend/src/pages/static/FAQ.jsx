import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotesSection from "../../components/common/NotesSection";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, slideInUp, maskedReveal } from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function FAQ() {
  const [openAccordion, setOpenAccordion] = useState("faq1");

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Navbar should be included in Layout, assuming this page differs slightly or uses global nav */}
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mb-6 shadow-2xl"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </motion.div>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            FREQUENTLY ASKED QUESTION
          </div>
          <MaskedHeading className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Clients Ask<br />
            About Jumbo Xerox
          </MaskedHeading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our printing services, delivery, and more.
          </p>
        </motion.div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* FAQ 1 */}
            <FAQItem
              id="faq1"
              isOpen={openAccordion === "faq1"}
              onClick={() => toggleAccordion("faq1")}
              number="1"
              question="How do I place an online printing order?"
              answer="You can upload your files directly on our website, choose your printing options (color/B&W, size, sides), add binding or lamination if needed, and proceed to payment. We'll print and deliver to your location in Guntur on the same day. If its out of guntur will deliver in 24Hrs"
            />

            {/* FAQ 2 */}
            <FAQItem
              id="faq2"
              isOpen={openAccordion === "faq2"}
              onClick={() => toggleAccordion("faq2")}
              number="2"
              question="What type of files do you support?"
              answer="We accept PDF, Word (DOC/DOCX), Images (JPG, PNG), PPT, Excel (converted to print format). If you have any other format, our team will assist you."
            />

            {/* FAQ 3 */}
            <FAQItem
              id="faq3"
              isOpen={openAccordion === "faq3"}
              onClick={() => toggleAccordion("faq3")}
              number="3"
              question="How long does printing take?"
              answer="Most orders are completed within 30 minutes to 2 hours, depending on quantity and type. Bulk orders may take a little longer."
            />

            {/* FAQ 4 */}
            <FAQItem
              id="faq4"
              isOpen={openAccordion === "faq4"}
              onClick={() => toggleAccordion("faq4")}
              number="4"
              question="Do you provide home delivery in Guntur?"
              answer="Yes! We offer doorstep delivery across Guntur city. You can also choose store pickup."
            />

            {/* FAQ 5 */}
            <FAQItem
              id="faq5"
              isOpen={openAccordion === "faq5"}
              onClick={() => toggleAccordion("faq5")}
              number="5"
              question="Are my documents safe and confidential?"
              answer="Absolutely. We guarantee 100% privacy. Your files are never shared and are deleted automatically after the order is completed."
            />
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-8 py-16 md:py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Looking For The Best Online Printing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started today with our fast, reliable, and affordable printing services. Upload your files and get professional prints delivered to your doorstep.
            </p>
            <Link
              to="/plan-printing" // Assuming planprinting.php maps to this
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Order Now
            </Link>
          </div>
        </motion.section>

        {/* Additional Help Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600">
              Our team is here to help you with any questions or concerns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 mb-3">Speak directly with our team</p>
              <a
                href="tel:+919441081125"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                +91 9441081125
              </a>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600 mb-3">Send us your questions</p>
              <a
                href="mailto:info@jumboxerox.com"
                className="text-green-600 font-semibold hover:text-green-800"
              >
                info@jumboxerox.com
              </a>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Contact Form
              </h4>
              <p className="text-gray-600 mb-3">Fill out our contact form</p>
              <Link
                to="/contact"
                className="text-purple-600 font-semibold hover:text-purple-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <NotesSection />
    </div>
  );
}

const FAQItem = ({ id, isOpen, onClick, number, question, answer }) => (
  <motion.div 
    variants={slideInUp}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
  >
    <button
      onClick={onClick}
      className={`w-full px-6 py-5 text-left flex items-center justify-between font-semibold transition-all ${
        isOpen
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          : "bg-white text-gray-900 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="text-lg font-bold">{number}.</span>
        <span>{question}</span>
      </span>
      <svg
        className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <AnimatePresence>
        {isOpen && (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
        >
            <div className="px-6 py-5 text-gray-700 leading-relaxed border-t border-gray-100">
            {answer}
            </div>
        </motion.div>
        )}
    </AnimatePresence>
  </motion.div>
);
