import { isNil } from "lodash";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	IonActionSheet,
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
import { Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from "shards-react";
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
	
	const [getUserComments, { data: comments, loading }] = GetUserComments();
	const [sendNotification, { loading: isSent }] = SendNotification();


	const prepareNotification = (params) => {
		let message = {
			app_id: ONESIGNAL_APP_ID,
			contents: { en: params.titolo },
			headings: { en: params.contenuto },
			ios_badgeCount: 1,
			ios_badgeType: "Increase",
			include_player_ids: [props.user.playerID],
		};
		sendNotification(message);
	};

	useIonViewWillEnter(() => {
		getUserComments({ user: props.user.email });
	});

	useEffect(() => {
		!isSent && toggleModal(false);
	}, [isSent])

	const refresh = (event) => {
		doRefresh(true);
		getUserComments({ user: props.user.email });
		setTimeout(() => {
			doRefresh(false);
			event.detail.complete();
		}, 2000);
	};

	const getComments = () => {
		if (loading)
			return <Placeholder cards={3} />

		if (comments.count === 0 || isNil(comments.count)) return <Message color={"bg-green-600"} label={"OK"} content={"No comments so far"} />
		return <CommentsList list={comments.comments} avatar={"images/default_avatar.jpg"} onReplySubmitted={commentReplyHandler} />;
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
						<Card className="mt-5">
							<CardBody className="px-1 py-4">
								<div className="flex bg-white">
									<div className="flex items-start px-4 ">
										<img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="images/default_avatar.jpg" alt="avatar" />
										<div className="">
											<div className="flex items-center justify-between">
												<h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.user.username}</h2>
											</div>
											<p className="text-gray-700">{props.user.email}</p>
										</div>
									</div>
								</div>

							</CardBody>
						</Card>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonRow>
							<div className="user-component px-2">
								{props.user.username && (
									<>
										<div className={`${view === "comments" ? "hidden" : ""}`}>
											<UserUtilities {...props} />
										</div>
										<div className={`${view !== "comments" ? "hidden" : ""}`}>
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
										</div>
									</>
								)}
							</div>
						</IonRow>
					</IonGrid>
				</IonContent>

				<IonActionSheet
					isOpen={showAlert}
					header="Do you really want to delete this user?"
					subHeader={`${props.user.username} id: ${props.user.id} `}
					onDidDismiss={() => setShowAlert(false)}
					cssClass='my-custom-class'
					buttons={[{
						text: 'Delete',
						role: 'destructive',
						handler: () => {
							dispatch(UserDelete({ id: props.user.id }));
							props.closeModal(false);
						}
					},
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => { }
					}]}
				>
				</IonActionSheet>
				<IonFooter className="shadow-md">
					<IonToolbar className="action-toolbar">
						<Card>
							<CardBody>
								<div className="flex justify-center">
									<div className="flex-auto">
										<Button
											theme="warning"
											onClick={() => toggleModal(true)}
										>Notifica</Button>
									</div>
									<div className="flex-auto">
										<Button
											theme="danger"
											onClick={() => setShowAlert(true)}
										>Elimina</Button>
									</div>
									<div className="flex-auto">
										<Button
											theme="light"
											onClick={() => props.closeModal(false)}
										>Chiudi</Button>
									</div>
								</div>
							</CardBody>
						</Card>
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
