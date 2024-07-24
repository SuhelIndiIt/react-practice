const loginThunk = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: "SET_STATE", key: "loading", payload: true });
    dispatch({ type: "SET_STATE", key: "error", payload: null });

    try {
      const userDetails = await loginUser(credentials);

      dispatch({
        type: "SET_STATE",
        key: "userDetails",
        payload: userDetails,
      });
    } catch (error) {
      dispatch({ type: "SET_STATE", key: "error", payload: error.message });
    } finally {
      dispatch({ type: "SET_STATE", key: "loading", payload: false });
    }
  };
};

const loginUser = (credentials) => {
  return credentials;
};

export default loginThunk;
