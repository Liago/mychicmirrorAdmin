import React, { useState, useEffect } from "react";
import {
	IonAlert,
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonRow,
	IonToast,
	IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { connect } from "react-redux";
import { Button, Card, Divider, Image, Message } from "semantic-ui-react";
import { sendNotification, userDelete, loadUserComments } from "../store/actions/";
import Placeholder from "../components/UI/skeleton_list";
import CommentsList from "../components/comments";

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

	useEffect(() => {
		props.onLoadComments({ user: props.user.email });
	}, []);

	return (
		<>
			<IonPage id="user">
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
									<Card className="fluid">
										<Card.Content>
											<Image className="right floated circular mini" src="images/default_avatar.jpg" />
											<Card.Header>{props.user.username}</Card.Header>
											<Card.Meta>{props.user.email}</Card.Meta>
										</Card.Content>
										<Card.Content>
											<Card.Description>
												<Message className={`${props.user.playerID ? "positive" : "negative"}`}>
													<Message.Header>OneSignal ID</Message.Header>
													<Message.Content>{props.user.playerID || "Not yet registered"}</Message.Content>
												</Message>
											</Card.Description>
										</Card.Content>
										<Card.Content>
											<Card.Header>Comments</Card.Header>
											<Divider />
											{!props.comments.success 
											? <Placeholder rows={5} /> 
											: <CommentsList list={props.comments.comments} avatar={"images/default_avatar.jpg"} />}
										</Card.Content>
									</Card>
								)}
							</div>
						</IonRow>
					</IonGrid>
					<IonToast
						isOpen={props.isUserNotified || props.isUserDeleted}
						onDidDismiss={() => setShowToast(false)}
						message={`${props.isUserNotified ? "Notification has been sent" : "User has been deleted"}`}
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
								props.onDeleteUser({ id: props.user.id });
								props.closeModal(false);
							},
						},
					]}
					onDidDismiss={() => setShowAlert(false)}
				/>
				<IonFooter>
					<IonToolbar>
						<Button.Group widths="3">
							<Button
								className={`huge blue compact ${props.isSending ? "loading disabled" : ""} ${!props.user.playerID ? "disabled" : ""}`}
								content="Send Notification"
								onClick={() => prepareNotification(props.user.playerID)}
							>
								Send Notification
							</Button>
							<Button className="huge red compact" content="Delete User" onClick={() => setShowAlert(true)} />
						</Button.Group>
					</IonToolbar>
				</IonFooter>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state) => {
	console.log("state", state);
	return {
		isError: state.error,
		isSending: state.loading,
		isUserDeleted: state.deleted,
		isUserNotified: state.notified,
		notificationResponse: state.notificationMessage,
		comments: state.commentsList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSendNotification: (params) => dispatch(sendNotification(params)),
		onDeleteUser: (params) => dispatch(userDelete(params)),
		onLoadComments: (params) => dispatch(loadUserComments(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
