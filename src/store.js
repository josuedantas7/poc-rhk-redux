// store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
