import React from "react";
import NotesSection from "../../components/common/NotesSection";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInUp } from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function Terms() {
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </motion.div>
          <MaskedHeading className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Terms and Conditions
          </MaskedHeading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read our terms and conditions carefully before placing an order
          </p>
        </motion.div>

        {/* Terms Content */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Delivery Terms */}
          <SectionCard
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
            borderColor="border-blue-600"
            title="Delivery Terms"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            }
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              We offer reliable delivery and local pickup options so you can
              choose the method that best suits your needs. Delivery time depends
              on the printing turnaround and shipping option you select.
            </p>
          </SectionCard>

          {/* Order Timing */}
          <SectionCard
            iconColor="text-indigo-600"
            bgColor="bg-indigo-100"
            borderColor="border-indigo-600"
            title="Order Timing"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            }
          >
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Turnaround time begins after payment confirmation and final file
              approval. Typical turnaround ranges from same day up to 7 business
              days depending on the product and chosen options.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">
                Once production is complete we dispatch orders immediately.
              </p>
            </div>
          </SectionCard>

          {/* Privacy & Disclaimer */}
          <SectionCard
            iconColor="text-red-600"
            bgColor="bg-red-100"
            borderColor="border-red-600"
            title="Privacy & Disclaimer"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            }
          >
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                We collect and process information necessary to fulfill orders and
                improve our service. We do not sell personally identifiable
                information.
              </p>
              <p>
                We may share data only to fulfill your order (for example with
                couriers), to comply with law, or to protect our rights.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  By using this site you accept these terms — please contact us
                  for the full privacy policy.
                </p>
              </div>
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
