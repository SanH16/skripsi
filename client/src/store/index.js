import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import userLogin from "./auth-get-user-slice";

// const rootReducers = combineReducers({
//   userLogin,
// });

// const store = configureStore({
//   reducer: rootReducers,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false,
//     });
//   },
// });

// export default store;
