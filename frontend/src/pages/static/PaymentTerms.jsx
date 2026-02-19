import React from "react";
import NotesSection from "../../components/common/NotesSection";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInUp } from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function PaymentTerms() {
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
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Payment Terms
          </div>
          <MaskedHeading className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            What Our Clients Ask<br />
            About Jumbo Xerox
          </MaskedHeading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure, convenient, and transparent payment options for all your printing needs
          </p>
        </motion.div>

        {/* Payment Terms Content */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Payment Methods */}
          <SectionCard
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
            borderColor="border-blue-600"
            title="1. How do I pay for an order on jumboxerox.com?"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            }
          >
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              jumboxerox.com offers you multiple payment modes online and we use
              one of the best payment gateways. Our gateway partners use secure
              encryption technology to keep your transaction details confidential
              at all times.
            </p>
          </SectionCard>

          {/* No Hidden Charges */}
          <motion.div 
            variants={slideInUp}
            className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-8 text-white hover:-translate-y-1 hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  2. Is there any hidden charge when I order on jumboxerox.com?
                </h2>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
              <p className="text-white leading-relaxed text-lg mb-4">
                <strong className="text-white">No hidden charges!</strong> The
                price mentioned after creation of the order is final and the price
                you see on the payment page is exactly what you have to pay.
              </p>
            </div>
          </motion.div>
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
