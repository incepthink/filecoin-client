"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  jwt: Cookies.get("jwt") || "",
  name: "",
  description: "",
  myNFTs: null,
  orderNFT: null,
  orderStage: 1,
  shippingDetails: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UNSET_USER":
      console.log("Removing User");
      return {
        ...state,
        user: null,
      };
    case "SET_JWT":
      return {
        ...state,
        jwt: action.payload,
      };
    case "UNSET_JWT":
      return {
        ...state,
        jwt: "",
      };
    case "SET_MY_NFTS":
      return {
        ...state,
        myNFTs: action.payload,
      };
    case "SET_ORDER_NFT":
      return {
        ...state,
        orderNFT: action.payload,
      };
    case "UNSET_ORDER_NFT":
      return {
        ...state,
        orderNFT: null,
      };
    default:
      return state;
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_ORDER_STAGE":
      return {
        ...state,
        orderStage: action.payload,
      };
    case "SET_SHIPPING_DETAILS":
      return {
        ...state,
        shippingDetails: action.payload,
      };
  }
}

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(Cookies.get("user")),
      });
    }
    if (Cookies.get("jwt")) {
      dispatch({
        type: "SET_JWT",
        payload: Cookies.get("jwt"),
      });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
