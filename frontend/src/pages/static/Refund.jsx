import React from "react";
import NotesSection from "../../components/common/NotesSection";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInUp, maskedReveal } from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function Refund() {
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full mb-6 shadow-2xl"
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
          </motion.div>
          <MaskedHeading className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Refund Policy
          </MaskedHeading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our commitment to customer satisfaction and fair refund practices
          </p>
        </motion.div>

        {/* Refund Policy Content */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Overview */}
          <SectionCard
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
            borderColor="border-blue-600"
            title="Overview"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            }
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              At Jumbo Xerox, we strive to provide the highest quality printing
              services. We understand that sometimes things don't go as planned,
              and we're committed to resolving any issues fairly and promptly.
              This refund policy outlines the circumstances under which refunds
              may be issued.
            </p>
          </SectionCard>

          {/* Eligibility for Refund */}
          <SectionCard
            iconColor="text-green-600"
            bgColor="bg-green-100"
            borderColor="border-green-600"
            title="Eligibility for Refund"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            }
          >
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>You may be eligible for a refund in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Printing Errors:</strong> If we made an error in
                  printing (wrong size, color, quantity, or quality issues caused
                  by our equipment)
                </li>
                <li>
                  <strong>Damaged Products:</strong> If your order arrives damaged
                  due to shipping or handling issues
                </li>
                <li>
                  <strong>Wrong Order:</strong> If you received a completely
                  different order than what you placed
                </li>
                <li>
                  <strong>Non-Delivery:</strong> If your order was not delivered
                  within the promised timeframe and you did not receive it
                </li>
                <li>
                  <strong>Service Cancellation:</strong> If we are unable to
                  fulfill your order and must cancel it
                </li>
              </ul>
            </div>
          </SectionCard>

          {/* Non-Refundable Items */}
          <SectionCard
            iconColor="text-red-600"
            bgColor="bg-red-100"
            borderColor="border-red-600"
            title="Non-Refundable Items"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            }
          >
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                Refunds will <strong>not</strong> be issued for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Customer Errors:</strong> Mistakes in file uploads,
                  wrong specifications provided by the customer, or incorrect
                  order details
                </li>
                <li>
                  <strong>Low-Quality Source Files:</strong> Poor print quality
                  resulting from low-resolution or improperly formatted source
                  files
                </li>
                <li>
                  <strong>Change of Mind:</strong> If you simply change your mind
                  after the order has been processed
                </li>
                <li>
                  <strong>Custom/Personalized Items:</strong> Customized or
                  personalized printing orders that have been completed
                </li>
              </ul>
            </div>
          </SectionCard>
        </motion.div>
      </main>

      <NotesSection />
    </div>
  );
}

const SectionCard = ({
  iconColor,
  bgColor,
  borderColor,
  title,
  icon,
  children,
}) => (
  <motion.div
    variants={slideInUp}
    className={`bg-white rounded-2xl shadow-xl p-8 border-t-4 ${borderColor} hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 ${bgColor} rounded-xl`}>
        <svg
          className={`w-8 h-8 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);
