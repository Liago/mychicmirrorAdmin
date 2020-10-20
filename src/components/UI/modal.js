import React, { useState, useEffect } from "react";
import { Dimmer, Loader, Modal } from "semantic-ui-react";

import NotificationForm from "../forms/notification";

const ModalNotification = (props) => {
	const [dimmerState, setDimmer] = useState(false);
	useEffect(() => {
		setDimmer(false);
	}, []);
	const handleSubmit = (values) => {
		setDimmer(true);
		props.submitNotification({ titolo: values.titolo, contenuto: values.contenuto });
	};

	return (
		<Modal size="small" open={props.open} onClose={() => props.modalToggler(false)}>
			<Dimmer inverted className={dimmerState ? "active" : ""}>
				<Loader inverted>Sending...</Loader>
			</Dimmer>
			<Modal.Header>{props.type.title_content}</Modal.Header>
			<Modal.Content>
				<NotificationForm onSubmit={handleSubmit} type={props.type} />
			</Modal.Content>
		</Modal>
	);
};

export default ModalNotification;
