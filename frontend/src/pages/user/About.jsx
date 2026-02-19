import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <section className="w-full">
      {/* HERO / BREADCRUMB */}
      <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
        {/* soft circles */}
        <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-pink-100 opacity-40" />
        <div className="absolute right-0 top-10 w-72 h-72 rounded-full bg-purple-100 opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            About Us
          </h1>

          {/* breadcrumb */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm">
            <NavLink
              to="/"
              className="text-pink-500 font-medium hover:underline"
            >
              Home
            </NavLink>
            <span className="text-pink-400">–</span>
            <span className="text-pink-500 font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold">
            MORE ABOUT US
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Printing Made Simple & Reliable
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you're a student, business owner, or professional, Jumbo
            Xerox delivers fast, reliable, and hassle-free printing solutions
            right to your fingertips.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Upload your files, calculate prices instantly, and get doorstep
            delivery across Guntur. From A4 printouts and plan prints to
            binding, cards, flyers, and brochures — we do it all with care and
            quality.
          </p>

          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:opacity-90">
            MORE ABOUT US
          </button>
        </div>

        {/* Right image placeholder */}
        <div className="relative">
          <div className="rounded-2xl bg-gradient-to-br from-teal-200 to-cyan-200 h-80 flex items-center justify-center shadow">
            <span className="text-gray-700 font-semibold">
              Printing Samples Image
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
