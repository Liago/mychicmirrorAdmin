import React, {useState} from "react";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonModal } from "@ionic/react";
import { Comment } from "semantic-ui-react";
import CommentForm from "../components/forms/notification";

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
											<div>{comment.date}</div>
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
			<IonModal isOpen={isModalOpen} showBackdrop={false} swipeToClose={true} cssClass="modalParse" onDidDismiss={() => toggleModal(false)}>
				<CommentForm type={{title: false, content:"comment"}} onSubmit={handleSubmit} />
			</IonModal>
		</IonList>
	);
};
export default Comments;
