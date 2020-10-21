import React, { useState } from "react";
import { Button, Card, Image, Label, Segment } from "semantic-ui-react";
import Modal from "../components/UI/modal";
import moment from "moment";

const Comments = (props) => {
	// console.log("COMMENTS props", props);
	const [isModalOpen, toggleModal] = useState(false);
	const { list, avatar } = props;
	console.log("MyList", list);
	return (
		<Segment>
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
						<Button size="mini" color="green">
							Approva
						</Button>,
					],
					1: [
						<Button size="mini" color="red">
							Disapprova
						</Button>,
					],
					spam: [
						<Button size="mini" color="orange">
							Non Spam
						</Button>,
					],
				};

				const getButtonApprove = (status) => {
					return mainButton[status] || [];
				};

				// return comment.status === "1" ? <Button size="mini" color="red">Disapprova</Button> : <Button size="mini" color="green">Approva</Button>

				return (
					<Segment raised className="p-0">
						<Card key={index} className="w-100">
							<Card.Content>
								{markAsSpam()}
								<Image floated="right" size="mini" src={avatar} />
								<Card.Header>{comment.author}</Card.Header>
								<Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
								<Card.Description>{comment.content}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								{getButtonApprove(comment.status)}
								<Button size="mini" color="red">
									Elimina
								</Button>
								<Button size="mini" color="blue">
									Spam!
								</Button>
							</Card.Content>
						</Card>
					</Segment>
				);
			})}
		</Segment>
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
