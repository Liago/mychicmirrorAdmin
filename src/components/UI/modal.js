import React from "react";
import { Modal } from "semantic-ui-react";

import NotificationForm from "../forms/notification";

const ModalNotification = (props) => {
	const handleSubmit = (values) => {
		props.submitNotification({ "titolo": values.titolo, "contenuto": values.contenuto });
	};
	return (
		<Modal size="small" open={props.open} onClose={() => props.modalToggler(false)}>
			<Modal.Header>{props.title}</Modal.Header>
			<Modal.Content>
				<NotificationForm onSubmit={handleSubmit} type={props.type} />
			</Modal.Content>
		</Modal>
	);
};

export default ModalNotification;
