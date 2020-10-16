import React from "react";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from "@ionic/react";
import { Comment } from "semantic-ui-react";

const Comments = (props) => {
	console.log("COMMENTS props", props);
	return (
		<IonList>
			{props.list.map((comment, index) => {
				return (
					<>
						<IonItemSliding className="comments-component" key={index}>
							<IonItem>
								{/* <IonLabel>{comment.comment_ID}</IonLabel> */}
								<Comment.Group>
									<Comment>
										<Comment.Avatar className="circular" as="a" src={props.avatar} />
										<Comment.Content>
											{/* <Comment.Author>Stevie Feliciano</Comment.Author> */}
											<Comment.Metadata>
												<div>{comment.date}</div>
												{/* <div>
												<Icon name="star" />5 Faves
											</div> */}
											</Comment.Metadata>
											<Comment.Text>{comment.content}</Comment.Text>
										</Comment.Content>
									</Comment>
								</Comment.Group>
							</IonItem>
							<IonItemOptions side="end">
								<IonItemOption onClick={() => {}}>Unread</IonItemOption>
							</IonItemOptions>
						</IonItemSliding>
					</>
				);
			})}
		</IonList>
	);
};
export default Comments;
