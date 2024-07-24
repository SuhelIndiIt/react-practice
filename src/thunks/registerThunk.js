const registerThunk = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: "SET_STATE", key: "loading", payload: true });
    dispatch({ type: "SET_STATE", key: "error", payload: null });

    try {
      const userDetails = await register(credentials);
      dispatch({
        type: "REMOVE_STATE",
        key: "userDetails",
      });
    } catch (error) {
      dispatch({ type: "SET_STATE", key: "error", payload: error.message });
    } finally {
      dispatch({ type: "SET_STATE", key: "loading", payload: false });
    }
  };
};

const register = (credentials) => {
  return credentials;
};

export default registerThunk;
