import React, { useState } from "react";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonNote,
	IonToggle,
} from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import { Message, Segment } from "semantic-ui-react";

const UserUtilities = ({user}) => {
	const [login, setLogin] = useState("not tested");
	const [checked, setChecked] = useState(false);
	return (
		<IonContent>
			<IonCard>
				<IonCardHeader>Settings</IonCardHeader>
				<IonCardContent>
					<Message className={`${user.playerID ? "positive" : "negative"}`}>
						<Message.Header>OneSignal ID</Message.Header>
						<Message.Content>{user.playerID || "Not yet registered"}</Message.Content>
					</Message>
					<IonList>
						<IonItem onClick={() => console.log("click")}>
							<IonIcon icon={logInOutline} slot="start"></IonIcon>
							Test login
							<IonNote slot="end">{login}</IonNote>
						</IonItem>
						<IonItem>
							<IonLabel>Reset Password</IonLabel>
							<IonToggle
								checked={checked}
								onIonChange={(e) => {
									setChecked(e.detail.checked);
									console.log("check", e.detail.checked);
								}}
								color="danger"
								slot="end"
							></IonToggle>
						</IonItem>
					</IonList>
				</IonCardContent>
			</IonCard>
		</IonContent>
	);
};
export default UserUtilities;
