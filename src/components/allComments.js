import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";
import { updateComment } from "../store/actions";
import Toast from "../components/UI/toast";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";

const Comments = (props) => {
	const { list, avatar, view } = props;
	const [isModalOpen, toggleModal] = useState(false);
	const [buttons, setButton] = useState({
		isApproving: false,
		isDeleting: false,
		isSpamming: false,
	});
	console.log("props", props);
	// console.log("isLoading", [props.isLoading, buttons]);

	const showToast = () => {
		if (props.error !== "")
			return <Toast position="middle" color="red" message={props.error} duration={2000} autoDismiss={!props.isLoading ? null : null} />;
	};
	const updateButtons = (button) => {
		setButton({
			...buttons,
			[button.name]: true,
		});
	};
	const handleSubmit = (values) => {
		console.log("Comment values", values);
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
								className={`icons ${buttons.isApproving && props.isLoading ? "loading" : ""}`}
								size="mini"
								color="green"
								circular
								icon="circular-icon thumbs up outline"
								onClick={() => {
									updateButtons({ name: "isApproving" });
									props.onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
								}}
							/>,
						],
						1: [
							<Button
								className={`${buttons.isApproving && props.isLoading ? "loading" : ""}`}
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
							<Card className={`w-100 ${comment.status === "0" ? "red" : ""}`}>
								<Card.Content>
									{markAsSpam()}
									<Image floated="right" size="mini" src={avatar} />
									<Card.Header>{comment.author}</Card.Header>
									<Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
									<Card.Description>{comment.content}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									{getButtonApprove(comment.status)}
									<Button
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
											className={`${buttons.isSpamming && props.isLoading ? "loading" : ""}`}
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
									{comment.status != "1" ? null : (
										<div className="right floated">
											<Button
												className={`${props.isLoading ? "loading" : ""}`}
												size="mini"
												color="purple"
												circular
												icon="circular-icon reply"
												onClick={() => {
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
				{showToast()}
			</Segment>
			<Modal
				open={isModalOpen}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				type={{ title: false, title_content: "Nuova Risposta", content: "&nbsp;" }}
			/>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		isLoading: state.app.loading,
		error: state.app.error,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onCommentUpdate: (params) => dispatch(updateComment(params)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
