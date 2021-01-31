import { isNil } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	IonAlert,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonRow,
	IonToolbar,
	useIonViewWillEnter,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { GetUserComments, SendCommentReply, SendNotification, UserDelete } from "../store/rest";

import Placeholder from "../components/UI/placeholder";
import CommentsList from "../components/comments";
import Modal from "../components/UI/modal";
import UserUtilities from "../components/user_utilities";
import { ONESIGNAL_APP_ID } from "../helpers/config";

import Message from "../components/UI/messages";

const User = (props) => {
	const dispatch = useDispatch();
	const [showAlert, setShowAlert] = useState(false);
	const [isRefreshing, doRefresh] = useState(false);
	const [isModalOpen, toggleModal] = useState(false);
	const [view, setView] = useState("comments");
	const [allComments, setAllComments] = useState(null);
	const [commentsCount, setCommentsCount] = useState(null);
	const [loading, setLoading] = useState(false);

	const { error, isloading, notificationMessage } = useSelector(state => state.app);
	const { commentsList } = useSelector(state => state.user)
	const { isCompleted } = useSelector(state => state.toast)






	const prepareNotification = (params) => {
		let message = {
			app_id: ONESIGNAL_APP_ID,
			contents: { en: params.titolo },
			headings: { en: params.contenuto },
			ios_badgeCount: 1,
			ios_badgeType: "Increase",
			include_player_ids: [props.user.playerID],
		};
		dispatch(SendNotification(message))
	};

	useIonViewWillEnter(() => {

		readComments();
	});

	const readComments = () => {
		setLoading(true);
		const { data, loading, error } = GetUserComments()
		if (data)
			setAllComments(data);
		setLoading(loading);
		// (async () => {
		// 	try {
		// 		const { comments, loading, count } = await props.onLoadComments({ user: props.user.email });
		// 		setAllComments(comments);
		// 		setLoading(loading);
		// 		setCommentsCount(count);
		// 		console.log('comments, loading, count', comments, loading, count)
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// })();
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
		if (isNil(commentsCount)) return <Placeholder cards={5} />;
		if (commentsCount === 0) return <Message color={"bg-green-600"} label={"OK"} content={"No comments so far"} />
		return <CommentsList list={allComments} avatar={"images/default_avatar.jpg"} onReplySubmitted={commentReplyHandler} />;
	};

	const commentReplyHandler = (values) => {
		console.log("commentReplyHandler", values);
		dispatch(SendCommentReply(values))
	};

	const handleSubmitNotification = (values) => {
		prepareNotification(values);
	};

	return (
		<>
			<IonPage id="user-card-detail" className="bg-grey-100">
				<IonHeader collapse="condense" className="ion-no-border">
					<IonToolbar>
						<div class="flex bg-white mx-4 border-b-2">
							<div class="flex items-start px-4 py-6">
								<img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="images/default_avatar.jpg" alt="avatar" />
								<div class="">
									<div class="flex items-center justify-between">
										<h2 class="text-lg font-semibold text-gray-900 -mt-1">{props.user.username}</h2>
										{/* <small class="text-sm text-gray-700">22h ago</small> */}
									</div>
									<p class="text-gray-700">{props.user.email}</p>
									{/* <p class="mt-3 text-gray-700 text-sm">Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!</p> */}
								</div>
							</div>
						</div>
						{/* 						
						<Card className="fluid raised toolbar-card">
							<Card.Content>
								<Image className="right floated circular mini" src="images/default_avatar.jpg" />
								<Card.Header>{props.user.username}</Card.Header>
								<Card.Meta>{props.user.email}</Card.Meta>
							</Card.Content>
							<Card.Content>
								{isNil(commentsCount) ? <Placeholder row={1} lines={1} /> : (
									<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
										<IonSegmentButton value="comments">{isNil(commentsCount) || loading ? <Icon className="icons asterisk loading inverted grey" /> : "Comments: " + commentsCount}</IonSegmentButton>
										<IonSegmentButton value="utility">Utility</IonSegmentButton>
									</IonSegment>
								)}
							</Card.Content>
						</Card> */}
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonRow>
							<div className="user-component">
								{props.user.username && (
									<Card className="fluid raised">
										<Card.Content extra className={`${view === "comments" ? "hidden" : ""}`}>
											<UserUtilities {...props} />
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
								dispatch(UserDelete({ id: props.user.id }))
								props.closeModal(false);
							},
						},
					]}
					onDidDismiss={() => setShowAlert(false)}
				/>
				<IonFooter>
					<IonToolbar className="action-toolbar">
						<div className="flex w-full justify-center">
							<div className="flex-grow w-16 h-16">
								<button
									className="px-8 py-2 bg-blue-600 text-white text-base font-semibold rounded-md shadow-md "
									onClick={() => toggleModal(true)}
								>Notifica</button>
							</div>
							<div className="flex-grow w-16 h-16">
								<button
									className="px-8 py-2 bg-red-600 text-white text-base font-semibold rounded-md shadow-md "
									onClick={() => setShowAlert(true)}
								>Elimina</button>
							</div>
							<div className="flex-grow w-16 h-16">
								<button
									className="px-8 py-2 bg-gray-600 text-white text-base font-semibold rounded-md shadow-md "
									onClick={() => props.closeModal(false)}
								>Chiudi</button>
							</div>
						</div>
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


export default User;
