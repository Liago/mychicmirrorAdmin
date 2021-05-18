import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from "shards-react";
import {IonSpinner } from "@ionic/react";

import PostModal from "../components/UI/modal_UI";
import Modal from "../components/UI/modal";

import { SendCommentReply, SendNotification } from "../store/rest";
import { ONESIGNAL_APP_ID } from "../helpers/config";
import moment from "moment";

const Comments = (props) => {
	const { list } = props;
	const { notificationSegment } = useSelector(state => state.app)
	const [isModalOpen, toggleModal] = useState(false);
	const [postId, setPostId] = useState(null);
	const [isPostModalOpen, togglePostModal] = useState(false);
	const [replyparams, setreplyparams] = useState({ post_ID: "", comment_post: "", comment_post_title: "", comment_parent: "", comment_content: "" });
	const [sendReply, { loading: isReplySent }] = SendCommentReply();
	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const [sendNotification] = SendNotification();

	useEffect(() => {
		if (
			replyparams.post_ID !== "" &&
			replyparams.comment_post !== "" &&
			replyparams.comment_post_title !== "" &&
			replyparams.comment_parent !== "" &&
			replyparams.comment_content !== ""
		) {
			let notificationparams = prepareNotification();
			sendReply(replyparams);
			sendNotification(notificationparams);
			resetReplyParams();			
		}
	}, [replyparams]);

	const resetReplyParams = () => {
		setreplyparams({ post_ID: "", comment_post: "", comment_post_title: "", comment_parent: "", comment_content: "" })
	}

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
			included_segments: [notificationSegment]
		};
		return message;
	};

	const handleSubmit = (values) => {
		setreplyparams({ ...replyparams, comment_content: values.contenuto });
		prepareNotification();
	};

	useEffect(() => {
		if (!isReplySent) {
			toggleModal(false);
			setIsSendingMessage(false);
		}
	}, [isReplySent])

	return (
		<>
			{list.map((comment, index) => {
				return (
					<Card className="m-3" key={index}>
						<CardHeader>
							<div className="w-full h-7 flex" onClick={() => { setPostId(comment.comment_post); togglePostModal(true) }}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
								</svg>
								<h2
									className="text-xl font-semibold pl-2"
									dangerouslySetInnerHTML={{ __html: comment.post_title.split(" / ")[0] }}></h2>
							</div>
						</CardHeader>
						<CardTitle className="text-right"><span className="font-light text-gray-600 text-xs px-2">{moment(comment.date).fromNow()}</span></CardTitle>
						<CardBody dangerouslySetInnerHTML={{ __html: comment.content }}></CardBody>
						<CardFooter className="text-right">
							<Button
								outline
								theme="success"
								onClick={() => {
									setreplyparams({
										...replyparams,
										post_ID: comment.comment_post,
										comment_post: comment.comment_post,
										comment_post_title: comment.post_title,
										comment_parent: comment.comment_ID,
									});
									toggleModal(true);
								}}>
								Rispondi
									</Button>
						</CardFooter>
					</Card>
				);
			})}

			<Modal
				open={isModalOpen}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				isSendingMessage={isSendingMessage}
				setIsSendingMessage={setIsSendingMessage}
				type={{ title: false, title_content: "Nuova Risposta", content: "comment" }}
			/>
			<PostModal
				open={isPostModalOpen}
				postId={postId}
				togglePostModal={togglePostModal}
			/>
		</>
	);
};

export default Comments;
