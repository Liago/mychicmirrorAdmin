import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";
import { updateComment, sendCommentReply } from "../store/actions";
import { ONESIGNAL_APP_ID } from "../helpers/config";
import { IonActionSheet } from "@ionic/react";
import { caretForwardCircle, close, heart, share, trash } from "ionicons/icons";

const Comments = (props) => {
	const { list, avatar, view } = props;
	const [isModalOpen, toggleModal] = useState(false);
	const [replyparams, setreplyparams] = useState({
		post_ID: "",
		comment_post: "",
		comment_post_title: "",
		comment_parent: "",
		comment_content: "",
	});
	const [buttons, setButton] = useState({ isApproving: false, isDeleting: false, isSpamming: false });
	const [showActionSheet, setShowActionSheet] = useState(false);

	const updateButtons = (button) => {
		setButton({
			...buttons,
			[button.name]: true,
		});
	};

	useEffect(() => {
		if (
			replyparams.post_ID !== "" &&
			replyparams.comment_post !== "" &&
			replyparams.comment_post_title !== "" &&
			replyparams.comment_parent !== "" &&
			replyparams.comment_content !== ""
		) {
			let notificationparams = prepareNotification();
			props.onSendCommentReply(replyparams, notificationparams);
		}
	}, [replyparams]);

	const handleSubmit = (values) => {
		setreplyparams({ ...replyparams, comment_content: values.contenuto });
	};

	const prepareNotification = () => {
		let title_it = replyparams.comment_post_title.split("/")[0];
		let title_en = replyparams.comment_post_title.split("/")[1];
		let message = {
			app_id: ONESIGNAL_APP_ID,
			contents: { en: "Someone posted a new comment!", it: "Qualcuno ha scritto un nuovo commento!" },
			headings: { en: title_en, it: title_it },
			ios_badgeCount: 1,
			ios_badgeType: "Increase",
			ios_sound: "nil",
			android_sound: "nil",
			data: { post: replyparams.comment_post },
			included_segments: ["TEST USERS"],
		};
		return message;
	};

	return (
		<>
			<Segment className="allcomments-component">
				{list.map((comment, index) => {
					const markAsSpam = () => {
						return comment.status === "spam" ? (
							<Label as="a" color="orange" ribbon="left">
								Spam
							</Label>
						) : null;
					};
					const mainButton = {
						0: [
							<Button
								key={index}
								className={`icons ${buttons.isApproving && props.isLoading ? "loading" : ""} ${
									comment.author === "mychicmirror" ? "hidden" : ""
								}`}
								size="mini"
								color="green"
								circular
								icon="circular-icon thumbs up outline"
								onClick={() => {
									updateButtons({ name: "isApproving" });
									props.onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
									props.doRefresh();
								}}
							/>,
						],
						1: [
							<Button
								key={index}
								className={`${buttons.isApproving && props.isLoading ? "loading" : ""} ${
									comment.author === "mychicmirror" ? "hidden" : ""
								}`}
								size="mini"
								color="yellow"
								circular
								icon="circular-icon thumbs down outline"
								onClick={() => {
									props.onCommentUpdate({ id: comment.comment_ID, status: "0", operation: "update" });
									updateButtons({ name: "isApproving" });
								}}
							/>,
						],
						spam: [
							<Button
								key={index}
								className={`${buttons.isSpamming && props.isLoading ? "loading" : ""}`}
								size="mini"
								color="orange"
								circular
								icon="circular-icon hide"
								onClick={() => {
									props.onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
									updateButtons({ name: "isSpamming" });
								}}
							/>,
						],
					};
					const getButtonApprove = (status) => {
						return mainButton[status] || [];
					};

					return (
						<Segment
							raised
							className={`p-0 
								${comment.status === "spam" && view !== "spam" ? "hidden" : ""} 
								${comment.status !== "spam" && view !== "all" ? "hidden" : ""}`}
							key={index}
						>
							<Card className={`w-100 ${comment.status === "0" ? "red" : ""}`} key={index}>
								<Card.Content>
									{markAsSpam()}
									<Image floated="right" size="mini" src={avatar} />
									<Card.Header>{comment.author}</Card.Header>
									<Card.Meta>{comment.post_title}</Card.Meta>
									<Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
									<Card.Description>{comment.content}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									{/* {getButtonApprove(comment.status)} */}
									<Button size="medium" content="Azioni" onClick={() => setShowActionSheet(true)} />
									{/* <Button
										className={`${buttons.isDeleting && props.isLoading ? "loading" : ""}`}
										size="mini"
										color="red"
										circular
										icon="circular-icon trash alternate outline"
										onClick={() => {
											props.onCommentUpdate({ id: comment.comment_ID, status: "", operation: "delete" });
											updateButtons({ name: "isDeleting" });
										}}
									/>
									{comment.status === "spam" ? null : (
										<Button
											className={`${buttons.isSpamming && props.isLoading ? "loading" : ""} ${
												comment.author === "mychicmirror" ? "hidden" : ""
											}`}
											size="mini"
											color="blue"
											circular
											icon="circular-icon attention"
											onClick={() => {
												props.onCommentUpdate({ id: comment.comment_ID, status: "spam", operation: "update" });
												updateButtons({ name: "isSpamming" });
											}}
										/>
									)}
									*/}
									{comment.status !== "1" || comment.author === "mychicmirror" ? null : (
										<div className="right floated">
											<Button
												className={`${props.isLoading ? "loading" : ""}`}
												size="medium"
												color="green"
												content="Rispondi"
												labelPosition="right"
												icon="circular-icon reply"
												onClick={() => {
													setreplyparams({
														...replyparams,
														post_ID: comment.comment_post,
														comment_post: comment.comment_post,
														comment_post_title: comment.post_title,
														comment_parent: comment.comment_ID,
													});
													toggleModal(true);
												}}
											/>
										</div>
									)} 
								</Card.Content>
							</Card>
						</Segment>
					);
				})}
			</Segment>
			<Modal
				open={isModalOpen}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				type={{ title: false, title_content: "Nuova Risposta", content: "comment" }}
			/>
			<IonActionSheet
				isOpen={showActionSheet}
				onDidDismiss={() => setShowActionSheet(false)}
				cssClass="my-custom-class"
				buttons={[
					{
						text: "Approva",
						handler: () => {
							console.log("Delete clicked");
						},
					},
					{
						text: "Disapprova",
						handler: () => {
							console.log("Share clicked");
						},
					},
					{
						text: "Sposta in spam",
						handler: () => {
							console.log("Play clicked");
						},
					},
					{
						text: "Elimina",
						role: "destructive",
						handler: () => {
							console.log("Favorite clicked");
						},
					},
					{
						text: "Cancel",
						icon: close,
						role: "cancel",
						handler: () => {
							console.log("Cancel clicked");
						},
					},
				]}
			></IonActionSheet>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		isLoading: state.app.loading,
		error: state.app.error,
		isReplySent: state.user.replied.success,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onCommentUpdate: (params) => dispatch(updateComment(params)),
		onSendCommentReply: (replyparams, notificationparams) => dispatch(sendCommentReply(replyparams, notificationparams)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
