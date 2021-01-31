import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";
import { UpdateComment, SendCommentReply } from "../store/rest";
import { ONESIGNAL_APP_ID } from "../helpers/config";
// import { IonActionSheet } from "@ionic/react";
import { caretForwardCircle, close, heart, share, trash } from "ionicons/icons";

import ActionSheet from "./UI/actionSheet";

const Comments = (props) => {
	console.log('props', props)
	const dispatch = useDispatch();

	const { loading, notificationSegment, error } = useSelector(state => state.app)
	const { success } = useSelector(state => state.user.replied)
	// const { isCompleted } = useSelector(state => state.toast)

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
	const [commentSelected, setcommentSelected] = useState(null);

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
			dispatch(SendCommentReply(replyparams, notificationparams));
		}
	}, [replyparams]);

	useEffect(() => {
		if (props.isSent)
			toggleModal(false)
	}, [props.isSent])

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
			included_segments: [props.notificationSegment],
			// included_segments: ["Subscribed Users"],
			// included_segments: ["TEST USERS"],
		};
		return message;
	};

	return (
		<>
			<Segment className="allcomments-component">
				{list.comments.map((comment, index) => {
					const markAsSpam = () => {
						return comment.status === "spam" ? (
							<Label as="a" color="orange" ribbon="left">
								Spam
							</Label>
						) : null;
					};
					return (
						<Segment
							raised
							className={`p-0 
								${comment.status === "spam" && view !== "spam" ? "hidden" : ""} 
								${comment.status !== "spam" && view !== "all" ? "hidden" : ""}`}
							key={index}
						>
							<Card className="w-100" key={index}>
								<Card.Content>
									{markAsSpam()}
									<Image floated="right" size="mini" src={avatar} />
									<Card.Header>{comment.author}</Card.Header>
									<Card.Meta>{comment.post_title}</Card.Meta>
									<Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
									<Card.Description>{comment.content}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<Button size="medium" color="blue" content="Azioni" onClick={() => { setShowActionSheet(true); setcommentSelected(comment) }} />
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
									<div className={`${comment.status === "0" ? "ui bottom right attached red label" : "hidden"}`}>Pending</div>

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
			<ActionSheet
				showActionSheet={showActionSheet}
				comment={commentSelected}
				onCommentUpdate={() => dispatch(UpdateComment())} //params??
				doRefresh={props.doRefresh}
				setShowActionSheet={setShowActionSheet}
			/>
		</>
	);
};
export default Comments;