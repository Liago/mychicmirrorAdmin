import { IonModal } from "@ionic/react";
import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import { IonSpinner } from "@ionic/react";

import UniversalForm from "../forms/universalForm";

const ModalNotification = (props) => {
	const [isSending, setSending] = useState(false);
	const handleSubmit = (values) => {
		setSending(true);
		props.submitNotification({ titolo: values.titolo, contenuto: values.commento });
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
					{isSending
						? <div className="grid place-content-center h-100"><IonSpinner name="lines" /></div>
						: <UniversalForm onSubmit={handleSubmit} type={props.type} />
					}
				</CardBody>
			</Card>
		</IonModal>
	);
};

export default ModalNotification;
