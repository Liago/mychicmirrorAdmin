import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from "@ionic/react";
import { Comment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import { sendCommentReply } from "../store/actions";
import { ONESIGNAL_APP_ID } from "../helpers/config";
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

							<div className="w-full bg-white rounded-lg shadow-md border p-1 my-5">
								<div className="flex justify-between items-center">
									<span className="font-light text-gray-600 text-sm px-2">{moment(comment.date).fromNow()}</span>
									{/* <a href="#" className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">Laravel</a> */}
								</div>
								<div className="mt-2">
									{/* <div className="text-xl text-red-700 font-bold px-2">{comment.post_title}></div> */}
									<div className="text-xl text-red-700 font-bold px-2" dangerouslySetInnerHTML={{ __html: comment.post_title }}></div>
									<p className="mt-2 text-gray-600 text-sm px-2 text-justify pt-3 border-t border-gray-100">{comment.content}</p>
								</div>
								{/* <div className="flex justify-between items-center mt-4">
									<a href="#" className="text-blue-500 hover:underline">Read more</a>
									<div>
										<a href="#" className="flex items-center">
											<img src={avatar} alt="avatar" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
											<h1 className="text-gray-700 font-bold hover:underline">Alex John</h1>
										</a>
									</div>
								</div> */}
							</div>


							{/* 							
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
							</Comment.Group> */}
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
				open={isModalOpen}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				type={{ title: false, title_content: "Nuova Risposta", content: "comment" }}
			/>
		</IonList >
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
