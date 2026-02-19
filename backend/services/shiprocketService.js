const axios = require("axios");

let token = null;

const authenticate = async () => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
// Shiprocket service optimized for production
    return "TEST_TOKEN";
  }

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );
    token = response.data.token;
    return token;
  } catch (error) {
    const authError = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
    console.error("Shiprocket Auth Error:", authError);
    throw new Error(`Shiprocket Auth Failed: ${authError}`);
  }
};

const createOrder = async (order) => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
    console.log("[SHIPROCKET-TEST] Creating Mock Order for:", order._id);
    return {
      shipment_id: `MOCK_SHIP_${Math.floor(Math.random() * 100000)}`,
      order_id: `MOCK_ORDER_${Math.floor(Math.random() * 100000)}`,
    };
  }

  if (!token) await authenticate();

  // Map your Order model to Shiprocket structure
  // Utility to Title Case
  const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  
  // Map common short names
  let city = order.shippingAddress.city.trim();
  if (city.toLowerCase() === "hyd") city = "Hyderabad";
  if (city.toLowerCase() === "secunderabad") city = "Secunderabad";

  const orderData = {
    order_id: order._id,
    order_date: new Date(order.createdAt).toISOString().split("T")[0],
    pickup_location: "Primary", // Try standard name 'Primary'
    // pickup_location_id: 20225035, // Legacy field? 
    billing_customer_name: toTitleCase(order.user.name),
    billing_last_name: "",
    billing_address: toTitleCase(order.shippingAddress.street),
    billing_address_2: "",
    billing_city: toTitleCase(city),
    billing_pincode: order.shippingAddress.pincode,
    billing_state: toTitleCase(order.shippingAddress.state), 
    billing_country: "India",
    billing_email: order.user?.email || "info@jumboxerox.com",
    billing_phone: order.user.phone.replace(/\D/g, '').slice(-10),
    shipping_is_billing: true,
    shipping_customer_name: toTitleCase(order.user.name),
    shipping_last_name: "",
    shipping_address: toTitleCase(order.shippingAddress.street),
    shipping_address_2: "",
    shipping_city: toTitleCase(city),
    shipping_pincode: order.shippingAddress.pincode,
    shipping_country: "India",
    shipping_state: toTitleCase(order.shippingAddress.state),
    shipping_email: order.user?.email || "info@jumboxerox.com",
    shipping_phone: order.user.phone.replace(/\D/g, '').slice(-10),
    order_items: [
      {
        name: "Print Service",
        sku: "PRINT_SRV",
        units: 1,
        selling_price: order.totalAmount,
      },
    ],
    payment_method: order.paymentStatus === "Paid" ? "Prepaid" : "COD",
    sub_total: order.totalAmount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  };

  console.log("[DEBUG] Shiprocket Order Payload:", JSON.stringify(orderData, null, 2));

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await authenticate(); // Retry once
      return createOrder(order);
    }
    const errorMessage = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
    console.error("Shiprocket Order Error:", errorMessage);
    throw new Error(`Shiprocket Error: ${errorMessage}`);
  }
};

const generateAWB = async (shipmentId) => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
    console.log("[SHIPROCKET-TEST] Generating Mock AWB for:", shipmentId);
    return {
      awb_code: `MOCK_AWB_${Math.floor(Math.random() * 1000000000)}`,
      courier_name: "Test Courier Service",
    };
  }

  if (!token) await authenticate();

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
      { shipment_id: shipmentId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.response.data;
  } catch (error) {
    console.error("Shiprocket AWB Error:", error.response?.data || error.message);
    throw new Error("Shiprocket AWB Generation Failed");
  }
};

module.exports = { authenticate, createOrder, generateAWB };
