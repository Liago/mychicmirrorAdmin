import React, { useState } from "react";
import { IonModal } from "@ionic/react";
import { Card, CardHeader, CardBody } from "shards-react";
import { IonSpinner } from "@ionic/react";

import UniversalForm from "../forms/universalForm";

const ModalNotification = ({ isSendingMessage, setIsSendingMessage, submitNotification, type, open, modalToggler }) => {
	// const [isSending, setSending] = useState(false);

	const handleSubmit = (values) => {
		setIsSendingMessage(true);
		submitNotification({ titolo: values.titolo, contenuto: values.commento });
		
	};

	const renderForm = () => {
		if (isSendingMessage)
			return <div className="grid place-content-center h-100"><IonSpinner name="lines" /></div>

		return <UniversalForm onSubmit={handleSubmit} type={type} />
	}

	return (
		<IonModal
			isOpen={open}
			cssClass='comment-modal-class'
			swipeToClose={true}
			presentingElement={undefined}
			onDidDismiss={() => modalToggler(false)}>

			<Card className="mx-2 mt-5">
				<CardHeader>{type.title_content}</CardHeader>
				<CardBody>{renderForm()}</CardBody>
			</Card>
		</IonModal>
	);
};

export default ModalNotification;
