// Import the configureStore function from Redux Toolkit.
// This function simplifies the process of creating a Redux store with various configurations and middleware.
import { configureStore } from '@reduxjs/toolkit';

// Import the combineReducers function from the redux library.
// This function is used to combine multiple reducer functions into a single reducer function.
import { combineReducers } from 'redux';

// Import the formReducer which handles actions related to the form.
// This reducer will update the state based on dispatched actions.
import formReducer from './reducer';

// Use combineReducers to create a single rootReducer.
// Currently, we only have one slice of state (form) managed by formReducer.
// As the app grows, we can add more slices of state and manage them with different reducers.
const rootReducer = combineReducers({
    form: formReducer
});

// Create the Redux store.
// The store holds the complete state of the app.
// The rootReducer is passed to the store, so it knows how to handle actions and update the state.
const store = configureStore({
    reducer: rootReducer
});

// Export the store so it can be used in other parts of the app.
// Specifically, it will be used in the main entry file (like index.tsx) to wrap the app with the Provider component.
export default store;
