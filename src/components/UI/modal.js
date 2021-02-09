import { IonModal } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Card, Dimmer, Loader } from "semantic-ui-react";

import UniversalForm from "../forms/universalForm";

const ModalNotification = (props) => {
	const [dimmerState, setDimmer] = useState(false);
	useEffect(() => {
		setDimmer(false);
	}, []);
	const handleSubmit = (values) => {
		setDimmer(true);
		console.log('Submitted values', values)
		// props.submitNotification({ titolo: values.titolo, contenuto: values.commento });
	};

	return (

		<IonModal
			isOpen={props.open}
			cssClass='comment-modal-class'
			swipeToClose={true}
			presentingElement={undefined}
			onDidDismiss={() => props.modalToggler(false)}>
			<Card fluid className="animate__fadeInUp animate__delay-2s">
				<Card.Content>
					<Dimmer className={dimmerState ? "active" : ""}>
						<Loader inverted>Sending...</Loader>
					</Dimmer>
					<Card.Header>
						{props.type.title_content}
					</Card.Header>
				</Card.Content>
				<Card.Content className="px-3">
					<UniversalForm onSubmit={handleSubmit} type={props.type}/>
				</Card.Content>
			</Card>
		</IonModal>
	);
};

export default ModalNotification;
