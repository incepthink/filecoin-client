import { StoreContext } from "@/Context";
import { useContext, useState } from "react";
import axios from "axios";

const Shipping = () => {
  const { state, dispatch } = useContext(StoreContext);
  console.log(state);
  const [shippingDetails, setShippingDetails] = useState({
    country: "",
    state: "",
    city: "",
    street_address_1: "",
    street_address_2: "",
    name: "",
    phone_number: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(shippingDetails.phone_number)) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      handleShippingSubmit(state, dispatch, shippingDetails);
    }
  };

  const isValidPhoneNumber = (number) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(number);
  };

  return (
    <div className="px-4 py-10 flex flex-col items-center w-full text-left">
      <h1 className="text-3xl">Shipping Details</h1>
      <div className="max-w-md w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
        {showAlert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">
              Please enter a valid 10-digit phone number.
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
          {Object.entries(shippingDetails).map(([name, value]) => (
            <input
              key={name}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                showAlert && name === "phone_number"
                  ? "border-red-500"
                  : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={name
                .split("_")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
              required={name !== "street_address_2"}
              pattern={name === "phone_number" ? "^[0-9]{10}$" : undefined}
              title={
                name === "phone_number"
                  ? "Phone number must be 10 digits"
                  : undefined
              }
            />
          ))}
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isValidPhoneNumber(shippingDetails.phone_number)
                ? "bg-primary hover:bg-blue-700"
                : "bg-blue-300"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

const handleShippingSubmit = async (state, dispatch, shippingDetails) => {
  try {
    if (!state.shippingDetails) {
      const res = await axios.post(
        "/backend/shippings/newShipping",
        {
          ...shippingDetails,
          user_id: state.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.jwt}`,
          },
        }
      );
      dispatch({ type: "SET_SHIPPING_DETAILS", payload: res.data });
      dispatch({ type: "SET_ORDER_STAGE", payload: 2 });
    } else {
      const res = await axios.put(
        `/backend/shippings/shipping/${state.shippingDetails.shipping_id}`,
        {
          shipping_details: {
            ...shippingDetails,
            user_id: state.user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${state.jwt}`,
          },
        }
      );
      console.log(res);

      dispatch({ type: "SET_SHIPPING_DETAILS", payload: res.data });
      dispatch({ type: "SET_ORDER_STAGE", payload: 2 });
    }
  } catch (error) {
    console.log(error);
  }
};
