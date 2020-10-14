import React from "react";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from "@ionic/react";

const PageDecorator = (props) => {
	console.log('[PageDecorator] props', props)
	return (
		<IonPage id={props.pageName}>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen="true">{props.content}</IonContent>
		</IonPage>
	);
};
export default PageDecorator;
