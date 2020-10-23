import * as actionTypes from "./actionTypes";

export const toastClear = () => {
    return {
        type: actionTypes.TOAST_CLEAR
    }
};

export const toastSetValue = (payload) => {
    return {
        type: actionTypes.TOAST_SET_VALUE,
        payload
    }
};