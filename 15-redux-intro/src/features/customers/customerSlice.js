import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// With redux toolkit
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    create: {
      prepare(fullName, nationalID) {
        return { payload: { fullName, nationalID, createdAt: new Date().toISOString() } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;

export const { create, updateName } = customerSlice.actions;

// Without redux toolkit
/*
export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/create",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
*/
