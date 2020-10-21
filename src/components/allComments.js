import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";
import { updateComment } from "../store/actions";
import Toast from "../components/UI/toast";
import { IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";

const Comments = (props) => {
	const { list, avatar } = props;
	const [isModalOpen, toggleModal] = useState(false);
	const [view, setView] = useState("all");
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
	return (
		<>
			<IonToolbar>
				<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
					<IonSegmentButton value="all">Comments</IonSegmentButton>
					<IonSegmentButton value="spam">Spam</IonSegmentButton>
				</IonSegment>
			</IonToolbar>
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
								className={`${buttons.isApproving && props.isLoading ? "loading" : ""}`}
								size="mini"
								color="green"
								icon
								labelPosition="left"
								onClick={() => {
									updateButtons({ name: "isApproving" });
									props.onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
								}}
							>
								<Icon className="icons" name="thumbs up outline" />
								Approva
							</Button>,
						],
						1: [
							<Button
								className={`${buttons.isApproving && props.isLoading ? "loading" : ""}`}
								size="mini"
								color="yellow"
								icon
								labelPosition="left"
								onClick={() => {
									props.onCommentUpdate({ id: comment.comment_ID, status: "0", operation: "update" });
									updateButtons({ name: "isApproving" });
								}}
							>
								<Icon className="icons" name="thumbs down outline" />
								Disapprova
							</Button>,
						],
						spam: [
							<Button
								className={`${buttons.isSpamming && props.isLoading ? "loading" : ""}`}
								size="mini"
								color="orange"
								icon
								labelPosition="left"
								onClick={() => {
									props.onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
									updateButtons({ name: "isSpamming" });
								}}
							>
								<Icon className="icons" name="hide" />
								Non Spam
							</Button>,
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
										icon
										labelPosition="left"
										onClick={() => {
											props.onCommentUpdate({ id: comment.comment_ID, status: "", operation: "delete" });
											updateButtons({ name: "isDeleting" });
										}}
									>
										<Icon className="icons" name="trash alternate outline" />
										Elimina
									</Button>
									{comment.status === "spam" ? null : (
										<Button
											className={`${buttons.isSpamming && props.isLoading ? "loading" : ""}`}
											size="mini"
											color="blue"
											icon
											labelPosition="left"
											onClick={() => {
												props.onCommentUpdate({ id: comment.comment_ID, status: "spam", operation: "update" });
												updateButtons({ name: "isSpamming" });
											}}
										>
											<Icon className="icons" name="attention" />
											Spam
										</Button>
									)}
								</Card.Content>
							</Card>
						</Segment>
					);
				})}
				{showToast()}
			</Segment>
		</>
		// 	<Modal
		// 		open={isModalOpen}
		// 		submitNotification={handleSubmit}
		// 		modalToggler={toggleModal}
		// 		type={{ title: false, title_content: "", content: "comment" }}
		// 	/>
		// </IonList>
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
