import { logUser, registerUser } from "./user.async.thunks";
import { initialState } from "./user.slice";

const logUserReducer = {
  [logUser.rejected]: () => {
    return initialState;
  },
  [logUser.fulfilled]: (state, { payload }) => {
    return { ...payload, loading: false };
  },
  [logUser.pending]: (state) => {
    state.loading = true;
  },
};

const registerUserReducer = {
  [registerUser.rejected]: () => {
    return initialState;
  },
  [registerUser.fulfilled]: (state, { payload }) => {
    return { ...payload, loading: false };
  },
  [registerUser.pending]: (state) => {
    state.loading = true;
  },
};

const extraReducers = {
  ...logUserReducer,
  ...registerUserReducer,
};

export default extraReducers;
