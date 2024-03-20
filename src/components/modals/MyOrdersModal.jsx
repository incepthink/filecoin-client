import { StoreContext } from "@/Context";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import notify from "@/scripts/notify";

const MyOrdersModal = ({ showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }

  const { state, dispatch } = useContext(StoreContext);
  if (!state.user) {
    setShowModal(false);
    return null;
  }

  const [orders, setOrders] = useState(null);

  const fetch = async () => {
    const orders = await fetchOrders(state, dispatch);
    setOrders(orders);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-2xl w-full h-auto bg-white shadow-xl rounded-lg overflow-hidden m-4">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-600 hover:text-gray-800 transition ease-in-out duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {orders ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Order ID: {order.id}</div>
                  <div className={`text-sm font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{order.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-lg font-medium text-gray-500">Fetching Orders...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersModal;

const fetchOrders = async (state, dispatch) => {
  try {
    const res = await axios.post(
      "/backend/orders/getAllOrderSummary",
      {
        userId: state.user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.jwt}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
