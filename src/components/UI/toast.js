import { isNil } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { IonContent, IonToast } from "@ionic/react";

import { toastClear } from "../../store/actions";

const Toast = (props) => {
	if (isNil(props.toast)) return null;

	const { color, position, message, duration } = props.toast;

	return (
		<IonContent>
			<IonToast
				isOpen={true}
				color={color}
				position={position || "top"}
				message={message}
				duration={duration || 2500}
				onDidDismiss={() => props.onToastClear()}
				cssClass="toastContainer"
			/>
		</IonContent>
	);
};

const mapStatetoProps = (state) => {
	return {
		toast: state.toast,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToastClear: () => dispatch(toastClear()),
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(Toast);
