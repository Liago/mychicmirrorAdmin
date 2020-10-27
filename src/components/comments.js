import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from "@ionic/react";
import { Comment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import { sendCommentReply } from "../store/actions";
import moment from "moment";

const Comments = (props) => {
	const { onReplySubmitted, avatar, list } = props;
	const [isModalOpen, toggleModal] = useState(false);
	const [replyparams, setreplyparams] = useState({ post_ID: "", comment_post: "", comment_post_title: "", comment_parent: "", comment_content: "" });

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
	const prepareNotification = () => {
		let title_it = replyparams.comment_post_title.split("/")[0];
		let title_en = replyparams.comment_post_title.split("/")[1];
		let message = {
			app_id: "e8d6a64e-936e-416d-8341-e3c60fb85a40",
			contents: { en: "Someone posted a new comment!", it: "Qualcuno ha scritto un nuovo commento!" },
			headings: { en: title_en, it: title_it },
			ios_badgeCount: 1,
			ios_badgeType: "Increase",
			data: {post: replyparams.comment_post},
			included_segments: ["TEST USERS"],
		};
		return message;
	};

	const handleSubmit = (values) => {
		setreplyparams({ ...replyparams, comment_content: values.contenuto });
		prepareNotification();
	};

	return (
		<IonList>
			{list.map((comment, index) => {
				return (
					<IonItemSliding className="comments-component" key={index}>
						<IonItem>
							<Comment.Group>
								<Comment>
									<Comment.Avatar className="circular" as="a" src={avatar} />
									<Comment.Content>
										<Comment.Author as="a">{comment.post_title}</Comment.Author>
										<Comment.Metadata>
											<div>{moment(comment.date).fromNow()}</div>
										</Comment.Metadata>
										<Comment.Text>{comment.content}</Comment.Text>
									</Comment.Content>
								</Comment>
							</Comment.Group>
						</IonItem>
						<IonItemOptions side="end">
							<IonItemOption
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
							>
								Reply
							</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				);
			})}

			<Modal
				open={isModalOpen && !props.isReplySent}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				type={{ title: false, title_content: "Nuova Risposta", content: "comment" }}
			/>
		</IonList>
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
		onSendCommentReply: (replyparams, notificationparams) => dispatch(sendCommentReply(replyparams, notificationparams)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
