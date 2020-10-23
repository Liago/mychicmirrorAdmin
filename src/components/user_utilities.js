import React, { useState } from "react";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonToggle } from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import { Segment } from "semantic-ui-react";

const UserUtilities = () => {
	const [login, setLogin] = useState("not tested");
	const [checked, setChecked] = useState(false);
	return (
		<IonContent>
			<Segment>
				<IonList>
					<IonListHeader>Settings</IonListHeader>
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
			</Segment>
		</IonContent>
	);
};
export default UserUtilities;
