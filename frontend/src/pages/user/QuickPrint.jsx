import { useNavigate } from "react-router-dom";
import QuickPrintForm from "../../components/quickprint/QuickPrintForm";

import toast from "react-hot-toast";

export default function QuickPrint() {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    toast.success("Added to cart");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <QuickPrintForm allowOrder={true} onSubmit={handleAddToCart} />
    </div>
  );
}
