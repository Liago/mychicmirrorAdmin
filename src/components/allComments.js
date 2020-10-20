import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { Button, Card, Image } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";

const Comments = (props) => {
	// console.log("COMMENTS props", props);
	const [isModalOpen, toggleModal] = useState(false);
	const { list, avatar } = props;
	console.log("MyList", list);
	return (
		<>
			{list.map((comment, index) => {
				return (
					<Card key={index}>
						<Card.Content>
							<Image floated="right" size="mini" src={avatar} />
							<Card.Header>{comment.author}</Card.Header>
							<Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
							<Card.Description>{comment.content}</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className="ui two buttons">
								<Button basic color="green">
									Approve
								</Button>
								<Button basic color="red">
									Decline
								</Button>
							</div>
						</Card.Content>
					</Card>
				);
			})}
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
export default Comments;
