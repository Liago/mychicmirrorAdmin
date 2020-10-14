import React, { useState } from "react";
import { IonAlert, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonToast, IonToolbar } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { connect } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";
import { sendNotification, userDelete } from "../store/actions/";

const User = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [notifySuccess, setShowToast] = useState(false);

	const prepareNotification = (PID) => {
		let message = {
			app_id: "e8d6a64e-936e-416d-8341-e3c60fb85a40",
			contents: { en: "If you can read it, I did it!" },
			headings: { en: "Notification from app" },
			include_player_ids: [PID],
		};
		props.onSendNotification(message);
	};

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="primary">
						<IonButton onClick={() => props.closeModal(false)}>
							<IonIcon slot="icon-only" icon={closeOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<IonRow>
						<div className="user-component">
							{props.user.username && (
								<Card>
									<Image src="images/default_avatar.jpg" wrapped ui={false} />
									<Card.Content>
										<Card.Header>{props.user.username}</Card.Header>
										<Card.Meta>{props.user.email}</Card.Meta>
										<Card.Description>
											OneSignal ID:
											<span className={`${props.user.playerID ? "ui mini label green" : "ui mini label"}`}>
												{props.user.playerID || "Not yet registered"}
											</span>
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
											<Button
												className={`ui tiny blue compact button ${props.isSending ? "loading disabled" : ""} ${!props.user.playerID ? "hidden" : ""}`}
												labelPosition="right"
												icon="send"
												content="Send Notification"
												onClick={() => prepareNotification(props.user.playerID)}
											/>
										<Button className="ui tiny red compact button" content="Delete User" onClick={() => setShowAlert(true)}/>
									</Card.Content>
								</Card>
							)}
						</div>
					</IonRow>
				</IonGrid>
				<IonToast
					isOpen={props.isUserNotified}
					onDidDismiss={() => setShowToast(false)}
					message="Notification have been sent"
					duration={500}
				/>
			</IonContent>
			<IonAlert
				isOpen={showAlert}
				header="Delete User"
				subHeader={props.user.email}
				message={`Do you really want to delete this user?\n ${props.user.username} id: ${props.user.id} `}
				buttons={[
					"Cancel",
					{
						text: "Ok",
						handler: () => {
							props.onDeleteUser({"id":props.user.id})
						},
					},
				]}
				onDidDismiss={() => setShowAlert(false)}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	console.log('state', state)
	return {
		isError: state.error,
		isSending: state.loading,
		isUserDeleted: state.user.deleted,
		isUserNotified: state.user.notified,
		notificationResponse: state.notificationMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSendNotification: (params) => dispatch(sendNotification(params)),
		onDeleteUser: (params) => dispatch(userDelete(params))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
