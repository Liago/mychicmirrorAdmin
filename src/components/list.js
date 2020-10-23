import React from "react";
import { IonIcon, IonList } from "@ionic/react";
import { connect } from "react-redux";
import { Card, Icon, Label, Segment } from "semantic-ui-react";
import { notificationsOutline, } from "ionicons/icons";

const list = (props) => {
	return (
		<IonList inset={true}>
			<div className="list-component">
				{props.users.map((user, index) => {
					return (
						<Segment raised className="p-0" key={index}>
							<Card onClick={() => props.onSelectUser(user)} className="w-100">
								<Card.Content>
									<Card.Header>{user.username}</Card.Header>
									<Card.Meta>{user.email}</Card.Meta>
								</Card.Content>
								<Card.Content extra>
									<Card.Description>
										<Label color={`${user.playerID ? "green" : "default"}`}>
											<Icon className="icons" name="bell" /> 
											{user.playerID || "no playerID retrieved"}
										</Label>
									</Card.Description>
								</Card.Content>
							</Card>
						</Segment>
					);
				})}
			</div>
		</IonList>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
	};
};

export default connect(mapStateToProps)(list);
