import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import PostModal from "../components/UI/modal_UI";
import moment from "moment";
import { SendCommentReply, SendNotification } from "../store/rest";
import { ONESIGNAL_APP_ID } from "../helpers/config";
import { Card, CardHeader, CardBody, CardTitle, Button, CardFooter } from "shards-react";

import ActionSheet from "./UI/actionSheet";

const Comments = (props) => {
	const dispatch = useDispatch();
	const { notificationSegment } = useSelector(state => state.app)
		// const { isCompleted } = useSelector(state => state.toast)

	const { list, avatar, view } = props;
	const [postId, setPostId] = useState(null);
	const [isModalOpen, toggleModal] = useState(false);
	const [isPostModalOpen, togglePostModal] = useState(false);
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
	const [sendNotification, { loading: isSent }] = SendNotification();
	const [sendReply, { loading: isReplySent }] = SendCommentReply();

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
			sendReply(replyparams);
			sendNotification(notificationparams);
		}
	}, [replyparams]);

	useEffect(() => {
		!isReplySent && toggleModal(false)
	}, [isReplySent])

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
			included_segments: [notificationSegment],
			// included_segments: ["TEST USERS"],
		};
		return message;
	};

	return (
		<>
			<Segment className="allcomments-component">
				{list.comments.map((comment, index) => {
					const markAsSpam = () => {
						return comment.status === "spam" && <div className="py-2 font-semibold text-red-800 text-right">Spam</div>;
					};
					return (
						<div key={index} className={`p-3 ${comment.status === "spam" && view !== "spam" ? "hidden" : ""} ${comment.status !== "spam" && view !== "all" ? "hidden" : ""}`}>
							<Card>
								<CardHeader>
									<div className="w-full h-7 flex" onClick={() => { setPostId(comment.comment_post); togglePostModal(true) }}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
										</svg>
										<h2
											className="text-xl font-semibold pl-2"
											dangerouslySetInnerHTML={{ __html: comment.post_title.split(" / ")[0] }}></h2>
									</div>
									{markAsSpam()}
								</CardHeader>
								<CardBody>
									<CardTitle className="pt-3.5">
										<div className="w-full h-16 flex items-center justify-between ">
											<div className="flex">
												<img className=" rounded-full w-10 h-10 mr-3" src={avatar} alt="" />
												<div>
													<h3 className="text-md font-semibold ">{comment.author}</h3>
													<p className="text-xs text-gray-500">{moment(comment.date).fromNow()}</p>
												</div>
											</div>
										</div>

									</CardTitle>
									<p>{comment.content}</p>
								</CardBody>
								<CardFooter className="flex justify-between">
									<Button
										outline
										theme="secondary"
										onClick={() => { setShowActionSheet(true); setcommentSelected(comment) }}>
										<span className="font-semibold text-lg text-white-600">Azioni</span>
									</Button>
									{comment.status !== "1" || comment.author === "mychicmirror"
										? null
										: (
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
												}}
											>
												<span className="font-semibold text-lg text-green-600">Rispondi</span>
											</Button>
										)}
								</CardFooter>
							</Card>
						</div>
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
				doRefresh={props.doRefresh}
				setShowActionSheet={setShowActionSheet}
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