import React from "react";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSegment, IonTitle, IonToolbar } from "@ionic/react";
import { Segment } from "semantic-ui-react";

const notifications = (props) => {
	return (
		<IonPage id="notifications-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Notifications</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen="true">
				<Segment raised>
					Notifications
				</Segment>
				<IonSegment></IonSegment>
			</IonContent>
		</IonPage>
	);
};
export default notifications;
