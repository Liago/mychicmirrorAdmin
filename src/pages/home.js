import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from "@ionic/react";
import React from "react";

const home = () => {
	return (
	<IonPage id="home-page">
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
			</IonToolbar>
		</IonHeader>
		<IonContent fullscreen="true">
			<h1> HomePage </h1>
		</IonContent>
	</IonPage>
	)
}

export default home;