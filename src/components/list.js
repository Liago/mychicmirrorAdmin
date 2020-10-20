import React from "react";
import { IonIcon, IonList } from "@ionic/react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { codeWorkingOutline, unlinkOutline } from "ionicons/icons";

const list = (props) => {
	return (
		<IonList inset={true}>
			{props.users.map((user, index) => {
				return (
					<div className="list-component" key={index}>
						<Card onClick={() => props.onSelectUser(user)}>
							<Card.Content>
								<Card.Header>{user.username}</Card.Header>
								<Card.Meta>{user.email}</Card.Meta>
								<Card.Description>{user.playerID}</Card.Description>
							</Card.Content>
							<div className="extra content">
								<span className="left floated red like">
									<IonIcon ios={codeWorkingOutline} md={codeWorkingOutline} />
									{index + 1}
								</span>
								<span className="right floated star">
									<IonIcon ios={unlinkOutline} md={unlinkOutline} />
									{user.id}
								</span>
							</div>
						</Card>
					</div>
				);
			})}
		</IonList>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
	};
};

export default connect(mapStateToProps)(list);
