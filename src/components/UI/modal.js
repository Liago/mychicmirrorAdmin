import { IonModal } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "shards-react";

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

			<Card className="mx-2 mt-5">
				<CardHeader>{props.type.title_content}</CardHeader>
				<CardBody>
					<UniversalForm onSubmit={handleSubmit} type={props.type} />
				</CardBody>
			</Card>
		</IonModal>
	);
};

export default ModalNotification;
