import React from "react";
import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { connect } from "react-redux";

const list = (props) => {
	return (
		<IonList inset={true}>
			{props.users.map((user, index) => {
				return (
					<div className="list-component" key={index}>
						<IonItem onClick={() => props.onSelectUser(user)} className="ui card">
							<IonNote slot="start">{index + 1}</IonNote>
							<IonLabel>
								<h2>{user.username}</h2>
								<p>{user.email}</p>
								<p>{user.playerID}</p>
							</IonLabel>
							<IonNote slot="end">{user.id}</IonNote>
						</IonItem>
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

const mapDispatchToProps = (dispacth) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(list);
