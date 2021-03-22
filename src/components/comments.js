import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from "shards-react";
import Modal from "../components/UI/modal";
import { SendCommentReply } from "../store/rest";
import { ONESIGNAL_APP_ID } from "../helpers/config";
import moment from "moment";

const Comments = (props) => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.app)
	const { success } = useSelector(state => state.user.replied)

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
			dispatch(SendCommentReply(replyparams, notificationparams));
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
		<>
			{list.map((comment, index) => {
				return (
					<Card className="m-3" key={index}>
						<CardHeader
							className="text-grey-800 font-medium"
							dangerouslySetInnerHTML={{ __html: comment.post_title }}></CardHeader>
						<CardTitle className="text-right"><span className="font-light text-gray-600 text-xs px-2">{moment(comment.date).fromNow()}</span></CardTitle>
						<CardBody dangerouslySetInnerHTML={{ __html: comment.content }}></CardBody>
						<CardFooter className="text-right">
							<Button
								size="sm"
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
				type={{ title: false, title_content: "Nuova Risposta", content: "comment" }}
			/>
		</>
	);
};

export default Comments;
