import React from "react";
import NotesSection from "../../components/common/NotesSection";
import { motion } from "framer-motion";
import { fadeInUp, maskedReveal } from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full mb-6 shadow-2xl"
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </motion.div>
          <MaskedHeading className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Privacy Policy
          </MaskedHeading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we handle your data.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600 hover:shadow-2xl transition-all duration-300"
        >
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Collection
            </h2>
            <p className="mb-4">
              We collect information to provide better services to all our users.
              This includes information you provide to us directly, such as when
              you create an account or place an order.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Information
            </h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, protect and
              improve our services, to develop new ones, and to protect Jumbo
              Xerox and our users.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="mb-4">
              We do not share personal information with companies, organizations
              and individuals outside of Jumbo Xerox unless one of the following
              circumstances applies:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>With your consent</li>
                <li>For legal reasons</li>
                <li>For external processing (e.g. shipping partners)</li>
              </ul>
            </p>
          </div>
        </motion.div>
      </main>

      <NotesSection />
    </div>
  );
}
