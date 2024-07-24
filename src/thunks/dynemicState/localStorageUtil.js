export const loadState = (keys) => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    return keys.reduce((acc, key) => {
      if (state[key] !== undefined) {
        acc[key] = state[key];
      }
      return acc;
    }, {});
  } catch (err) {
    console.error("Error loading state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state, keys) => {
  try {
    const serializedState = JSON.stringify(
      keys.reduce((acc, key) => {
        if (state[key] !== undefined) {
          acc[key] = state[key];
        }
        return acc;
      }, {})
    );
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
};

export const removeState = (keys) => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return;
    }
    const state = JSON.parse(serializedState);
    const newState = { ...state };

    keys.forEach((key) => {
      delete newState[key];
    });

    localStorage.setItem("appState", JSON.stringify(newState));
  } catch (err) {
    console.error("Error removing state from localStorage", err);
  }
};
