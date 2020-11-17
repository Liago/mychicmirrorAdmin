import { isNil } from "lodash";
import React, { useState } from "react";
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
	IonSegment,
	IonSegmentButton,
	IonToolbar,
	useIonViewWillEnter,
} from "@ionic/react";
import { closeCircleOutline, notificationsCircle, refreshOutline, trashOutline } from "ionicons/icons";
import { connect } from "react-redux";
import { Card, Image, Message } from "semantic-ui-react";
import { sendNotification, userDelete, loadUserComments, sendCommentReply } from "../store/actions/";

import Placeholder from "../components/UI/skeleton_list";
import CommentsList from "../components/comments";
import Modal from "../components/UI/modal";
import UserUtilities from "../components/user_utilities";
import { ONESIGNAL_APP_ID } from "../helpers/config";

const User = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [isRefreshing, doRefresh] = useState(false);
	const [isModalOpen, toggleModal] = useState(false);
	const [view, setView] = useState("comments");
	const [allComments, setAllComments] = useState(null);
	const [commentsCount, setCommentsCount] = useState(0);
	const [loading, setLoading] = useState(false);

	const prepareNotification = (params) => {
		let message = {
			app_id: ONESIGNAL_APP_ID,
			contents: { en: params.titolo },
			headings: { en: params.contenuto },
			ios_badgeCount: 1,
			ios_badgeType: "Increase",
			include_player_ids: [props.user.playerID],
		};
		props.onSendNotification(message);
	};

	useIonViewWillEnter(() => {
		readComments();
	});

	const readComments = () => {
		setLoading(true);
		(async () => {
			try {
				const { comments, loading, count } = await props.onLoadComments({ user: props.user.email });
				setAllComments(comments);
				setLoading(loading);
				setCommentsCount(count);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	const refresh = (event) => {
		doRefresh(true);
		readComments();
		setTimeout(() => {
			doRefresh(false);
			event.detail.complete();
		}, 2000);
	};

	const getComments = () => {
		if (isNil(allComments) || loading) return <Placeholder rows={5} />;
		if (isNil(allComments) && commentsCount === 0) return <IonLabel color="dark">No comments so far</IonLabel>;
		return <CommentsList list={allComments} avatar={"images/default_avatar.jpg"} onReplySubmitted={commentReplyHandler} />;
	};

	const commentReplyHandler = (values) => {
		console.log("commentReplyHandler", values);
		props.onCommentSubmitted(values);
	};

	const handleSubmitNotification = (values) => {
		prepareNotification(values);
	};

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
										<IonToolbar>
											<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
												<IonSegmentButton value="comments">Comments</IonSegmentButton>
												<IonSegmentButton value="utility">Utility</IonSegmentButton>
											</IonSegment>
										</IonToolbar>
										<Card.Content extra className={`${view === "comments" ? "hidden" : ""}`}>
											<UserUtilities />
										</Card.Content>
										<Card.Content extra className={`${view !== "comments" ? "hidden" : ""}`}>
											<IonRefresher slot="fixed" onIonRefresh={refresh}>
												<IonRefresherContent
													pullingIcon={refreshOutline}
													pull-factor="200"
													pullingText="Pull to refresh"
													refreshingSpinner="crescent"
													refreshingText="Refreshing..."
												></IonRefresherContent>
											</IonRefresher>
											{getComments()}
										</Card.Content>
									</Card>
								)}
							</div>
						</IonRow>
					</IonGrid>
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
										onClick={() => toggleModal(true)}
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
				<Modal
					open={isModalOpen}
					submitNotification={handleSubmitNotification}
					modalToggler={toggleModal}
					type={{ title: true, title_content: "Notifica personale", content: "notification" }}
				/>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state) => {
	console.log("[USERJS] state", state);
	return {
		isError: state.app.error,
		isSending: state.app.loading,
		notificationResponse: state.app.notificationMessage,
		comments: state.user.commentsList,
		isReplySent: state.toast?.isCompleted,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSendNotification: (params) => dispatch(sendNotification(params)),
		onDeleteUser: (params) => dispatch(userDelete(params)),
		onLoadComments: (params) => dispatch(loadUserComments(params)),
		onCommentSubmitted: (params) => dispatch(sendCommentReply(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
