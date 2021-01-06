import { IonModal } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Card, Dimmer, Loader, Modal } from "semantic-ui-react";

import NotificationForm from "../forms/notification";

const ModalNotification = (props) => {
	const [dimmerState, setDimmer] = useState(false);
	useEffect(() => {
		setDimmer(false);
	}, []);
	const handleSubmit = (values) => {
		setDimmer(true);
		props.submitNotification({ titolo: values.titolo, contenuto: values.commento });
	};

	return (

		<IonModal
			isOpen={props.open}
			cssClass='comment-modal-class'
			swipeToClose={true}
			presentingElement={undefined}
			onDidDismiss={() => props.modalToggler(false)}>
			<Card fluid classname="animate__fadeInUp animate__delay-2s">
				<Card.Content>
					<Dimmer className={dimmerState ? "active" : ""}>
						<Loader inverted>Sending...</Loader>
					</Dimmer>
					<Card.Header>
						{props.type.title_content}
					</Card.Header>
				</Card.Content>
				<Card.Content>
					<NotificationForm onSubmit={handleSubmit} type={props.type} />
				</Card.Content>
			</Card>
		</IonModal>
	);
};

export default ModalNotification;
