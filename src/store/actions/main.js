import * as actionTypes from "./actionTypes";

export const setDarkMode = (dark) => {
	if (dark) {
		return {
			type: actionTypes.DARK_MODE_SET,
		};
	} else {
		return {
			type: actionTypes.NORMAL_MODE_SET,
		};
	}
};