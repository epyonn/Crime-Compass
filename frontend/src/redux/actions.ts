// Action Types
export const SET_DATE = 'SET_DATE';
export const SET_TIME = 'SET_TIME';
export const SET_LOCATION = 'SET_LOCATION';
export const RESET_FORM = 'RESET_FORM';

// Action Creators

// Set Date Action
export const setDate = (date:string) => ({
    type:SET_DATE,
    payload: date 
});

export const setTime =(time:string) => ({
    type: SET_TIME,
    payload: time,
});

export const setLocation = (address:string) => ({
    type: SET_LOCATION,
    payload: address,
});

export const resetForm = () => ({
    type: RESET_FORM
});
