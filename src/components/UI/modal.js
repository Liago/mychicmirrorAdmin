import React from "react";
import { Button, Modal } from "semantic-ui-react";

import NotificationForm from "../forms/notification";

const ModalNotification = (props) => {

	const handleSubmit = (values) => {
		console.log('Form values', values)
	}
	return (
		<Modal size="small" open={props.open} onClose={() => props.modalToggler(false)}>
			<Modal.Header>{props.title}</Modal.Header>
			<Modal.Content>
					<NotificationForm onSubmit={handleSubmit}/>
			</Modal.Content>
			{/* <Modal.Actions>
				<Button negative onClick={() => props.modalToggler(false)}>
					No
				</Button>
				<Button positive onClick={() => props.modalToggler(false)}>
					Invia
				</Button>
			</Modal.Actions> */}
		</Modal>
	);
};

export default ModalNotification;
