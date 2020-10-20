import React, { useState } from "react";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from "@ionic/react";
import { Comment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";

const Comments = (props) => {
	console.log("COMMENTS props", props);
	const { onReplySubmitted, avatar, list } = props;
	const [isModalOpen, toggleModal] = useState(false);

	const handleSubmit = (values) => {
		console.log("Comment values", values);
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
										<Comment.Metadata>
											<div>{moment(comment.date).fromNow()}</div>
										</Comment.Metadata>
										<Comment.Text>{comment.content}</Comment.Text>
									</Comment.Content>
								</Comment>
							</Comment.Group>
						</IonItem>
						<IonItemOptions side="end">
							<IonItemOption onClick={() => toggleModal(true)}>Reply</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				);
			})}

			<Modal
				open={isModalOpen}
				submitNotification={handleSubmit}
				modalToggler={toggleModal}
				type={{ title: false, title_content: "", content: "comment" }}
			/>
		</IonList>
	);
};
export default Comments;
