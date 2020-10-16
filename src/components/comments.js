import React from "react";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from "@ionic/react";
import { Comment } from "semantic-ui-react";

const Comments = (props) => {
	console.log("COMMENTS props", props);
	return (
		<IonList>
			{props.list.map((comment, index) => {
				return (
					<IonItemSliding className="comments-component" key={index}>
						<IonItem>
							<Comment.Group>
								<Comment>
									<Comment.Avatar className="circular" as="a" src={props.avatar} />
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
							<IonItemOption onClick={() => {}}>Reply</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				);
			})}
		</IonList>
	);
};
export default Comments;
