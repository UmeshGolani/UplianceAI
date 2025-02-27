import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    userId: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = uuidv4();
    const userData = { ...formData, userId: newUserId };

    dispatch(setUserData(userData));
    Swal.fire({
      title: "Success!",
      text: "Your data has been successfully submitted.",
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      userId: "",
    });
    setIsFormChanged(false);
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (isFormChanged) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormChanged]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">User Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
