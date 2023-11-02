import {
    SET_DATE,
    SET_TIME,
    SET_LOCATION,
    RESET_FORM
} from './actions';

const initialState = {
    date: '',
    time: '',
    location: '',

  };
  

// Reducer Function
const formReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DATE:
            return { ...state, date: action.payload};
        case SET_TIME: 
            return { ...state, time: action.payload};
        case SET_LOCATION: 
            return {...state, location:action.payload};
        case RESET_FORM:
            return initialState;
        default:
            return state;
    }
};

export default formReducer;