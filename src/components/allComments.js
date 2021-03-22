import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import PostModal from "../components/UI/modal_UI";
import moment from "moment";
import { SendCommentReply } from "../store/rest";
import { ONESIGNAL_APP_ID } from "../helpers/config";
import { Card, CardHeader, CardBody, CardTitle, Button, CardFooter } from "shards-react";

import ActionSheet from "./UI/actionSheet";

const Comments = (props) => {
	console.log('props', props)
	const dispatch = useDispatch();

	const { loading, notificationSegment, error } = useSelector(state => state.app)
	const { success } = useSelector(state => state.user.replied)
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






						// <div key={index} className={`px-3 ${comment.status === "spam" && view !== "spam" ? "hidden" : ""} ${comment.status !== "spam" && view !== "all" ? "hidden" : ""}`}>
						// 	<div className="bg-white w-full border rounded-md shadow-md h-auto py-3 px-3 my-5">
						// 		{markAsSpam()}
						// 		<div className="w-full h-16 flex items-center justify-between ">
						// 			<div className="flex">
						// 				<img className=" rounded-full w-10 h-10 mr-3" src={avatar} alt="" />
						// 				<div>
						// 					<h3 className="text-md font-semibold ">{comment.author}</h3>
						// 					<p className="text-xs text-gray-500">{moment(comment.date).fromNow()}</p>
						// 				</div>
						// 			</div>
						// 		</div>
						// 		<p>{comment.content}</p>
						// 		<div className="w-full h-8 flex items-center px-3 my-3">
						// 			{/* <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
						// 				<svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
						// 			</div>
						// 			<div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
						// 				<svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
						// 			</div> */}

						// 			{/* <div className="w-full flex justify-between">
						// 				<p className="ml-3 text-gray-500">8</p>
						// 				<p className="ml-3 text-gray-500">29 comment</p>
						// 			</div> */}
						// 		</div>
						// 		<hr />
						// 		<div className="grid grid-cols-2 w-full px-5 my-3">
						// 			<button
						// 				className="flex flex-row justify-center items-center w-full space-x-3 p-2 focus:outline-none"
						// 				onClick={() => { setShowActionSheet(true); setcommentSelected(comment) }}>
						// 				<span className="font-semibold text-lg text-blue-600">Azioni</span>
						// 			</button>
						// 			{comment.status !== "1" || comment.author === "mychicmirror"
						// 				? null
						// 				: (
						// 					<button
						// 						className="flex flex-row justify-center items-center w-full space-x-3 p-2 focus:outline-none"
						// 						onClick={() => {
						// 							setreplyparams({
						// 								...replyparams,
						// 								post_ID: comment.comment_post,
						// 								comment_post: comment.comment_post,
						// 								comment_post_title: comment.post_title,
						// 								comment_parent: comment.comment_ID,
						// 							});
						// 							toggleModal(true);
						// 						}}
						// 					>
						// 						<span className="font-semibold text-lg text-green-600">Rispondi</span>
						// 					</button>
						// 				)}
						// 		</div>
						// 	</div>
						// </div>

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