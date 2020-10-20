import { isNil, size } from "lodash";
import React, { useState, useEffect } from "react";
import {
	IonAlert,
	IonButton,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonRow,
	IonToast,
	IonToolbar,
} from "@ionic/react";
import { closeCircleOutline, notificationsCircle, refreshOutline, trashOutline } from "ionicons/icons";
import { connect } from "react-redux";
import { Card, Divider, Image, Label, Message } from "semantic-ui-react";
import { sendNotification, userDelete, loadUserComments } from "../store/actions/";

import Placeholder from "../components/UI/skeleton_list";
import CommentsList from "../components/comments";
import Modal from "../components/UI/modal";

const User = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [notifySuccess, setShowToast] = useState(false);
	const [isRefreshing, doRefresh] = useState(false);
	const [isModalOpen, toggleModal] = useState(false)

	const prepareNotification = (PID) => {
		let message = {
			app_id: "e8d6a64e-936e-416d-8341-e3c60fb85a40",
			contents: { en: "If you can read it, I did it!" },
			headings: { en: "Notification from app" },
			include_player_ids: [PID],
		};
		toggleModal(true);
		// props.onSendNotification(message);
	};

	useEffect(() => {
		props.onLoadComments({ user: props.user.email });
	}, []);

	const refresh = (event) => {
		doRefresh(true);
		setTimeout(() => {
			doRefresh(false);
			event.detail.complete();
		}, 2000);
	};

	const getComments = () => {
		if (isNil(props.comments.comments) || props.comments.result == 0) return <IonLabel color="dark">No comments so far</IonLabel>;
		return <CommentsList list={props.comments.comments} avatar={"images/default_avatar.jpg"} />;
	};
	console.log("props", props);
	return (
		<>
			<IonPage id="user-card-detail">
				<IonHeader>
					<IonToolbar></IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonRow>
							<div className="user-component">
								{props.user.username && (
									<Card className="fluid raised">
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
										<Card.Content extra>
											<Card.Header>
												<Label>
													Comments
													<Label.Detail>{size(props.comments.comments)}</Label.Detail>
												</Label>
											</Card.Header>
											<Divider />

											<IonRefresher slot="fixed" onIonRefresh={refresh}>
												<IonRefresherContent
													pullingIcon={refreshOutline}
													pull-factor="200"
													pullingText="Pull to refresh"
													refreshingSpinner="crescent"
													refreshingText="Refreshing..."
												></IonRefresherContent>
											</IonRefresher>
											{!props.comments.success || isRefreshing ? <Placeholder rows={5} /> : getComments()}
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
					<IonToolbar className="action-toolbar">
						<IonGrid>
							<IonRow>
								<IonCol>
									<IonButton
										size="large"
										fill="clear"
										onClick={() => prepareNotification(props.user.playerID)}
										className={`ui basic ${props.isSending ? "ui basic loading disabled" : ""} ${
											!props.user.playerID ? "ui basic disabled" : ""
										}`}
									>
										<IonIcon slot="icon-only" icon={notificationsCircle} />
									</IonButton>
								</IonCol>
								<IonCol>
									<IonButton color="danger" onClick={() => setShowAlert(true)} fill="clear">
										<IonIcon slot="icon-only" icon={trashOutline} />
									</IonButton>
								</IonCol>
								<IonCol>
									<IonButton onClick={() => props.closeModal(false)} color="dark" fill="clear">
										<IonIcon slot="icon-only" icon={closeCircleOutline} />
									</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonToolbar>
				</IonFooter>
				<Modal open={isModalOpen} modalToggler={toggleModal} title={"Contenuto Notifica"}/>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state) => {
	console.log("state", state);
	return {
		isError: state.app.error,
		isSending: state.app.loading,
		isUserDeleted: state.user.deleted,
		isUserNotified: state.user.notified,
		notificationResponse: state.app.notificationMessage,
		comments: state.user.commentsList,
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
