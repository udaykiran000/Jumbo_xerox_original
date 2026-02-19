import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function Profile() {
  //

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    addresses: [],
  });
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 1. Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/users/profile`);
        setProfile(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Update Basic Info (Name/Phone)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", {
        name: profile.name,
        phone: profile.phone,
      });
      toast.success("Profile Updated!");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  // 3. Add New Address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/address", newAddress);
      setProfile({ ...profile, addresses: data }); // UI update
      setShowModal(false);
      setNewAddress({ street: "", city: "", state: "", pincode: "" }); // clear
      toast.success("Address Added Successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add address");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-blue-600 font-bold">
        Loading Profile Details...
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Personal Info */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-600 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaUser className="text-blue-600" /> Personal Info
          </h2>
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase">
                Email Address
              </label>
              <input
                type="text"
                value={profile.email}
                disabled
                className="w-full p-3 bg-gray-100 border rounded-xl cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase">
                Phone Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition">
              <FaSave /> Save Profile
            </button>
          </form>
        </div>

        {/* Right Side: Addresses */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> Saved Addresses
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-200 transition"
            >
              <FaPlus /> Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.addresses && profile.addresses.length > 0 ? (
              profile.addresses.map((addr, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-gray-100 rounded-2xl hover:border-green-200 transition bg-gray-50 relative group"
                >
                  <p className="font-bold text-gray-800">{addr.street}</p>
                  <p className="text-gray-600">
                    {addr.city}, {addr.state}
                  </p>
                  <p className="text-sm font-mono text-gray-500 mt-1">
                    {addr.pincode}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 border-2 border-dashed rounded-2xl text-gray-400">
                No addresses saved yet. Add one to enable delivery!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ADDRESS MODAL (POPUP) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Address</h2>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <input
                type="text"
                placeholder="Street / Area Name"
                required
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Pincode"
                required
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />
              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg transition">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
