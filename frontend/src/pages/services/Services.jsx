import PriceCard from "../../components/common/PriceCard";
// import QuickPrintForm from "../../components/quickprint/QuickPrintForm";

export default function Services() {
  return (
    <div>
      {/* 🔒 Preview mode only */}

      {/* -------- QUICK PRINT PREVIEW -------- */}
      <div className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Quick Print (Preview)
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Upload your document and see pricing instantly.
          <br />
          Login required to place order.
        </p>
      </div>
      {/* -------- PRICING SECTION -------- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Services & Pricing
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Transparent pricing. No hidden charges.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PriceCard
            title="Black & White (A4)"
            price="₹2"
            sub="per page"
            features={["75 GSM Paper", "Laser Print", "Single / Double Side"]}
          />

          <PriceCard
            title="Color Print (A4)"
            price="₹10"
            sub="per page"
            bg="bg-blue-50 border-blue-200"
            features={["High Quality Print", "Images & Text", "Vibrant Colors"]}
          />

          <PriceCard
            title="Spiral Binding"
            price="₹40"
            sub="per book"
            features={["Durable Binding", "Plastic Cover", "Up to 300 pages"]}
          />
        </div>
      </div>
    </div>
  );
}
