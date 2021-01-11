import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	IonAlert,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonMenuButton,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { loadUsers, userRegistration } from "../store/actions";
import List from "../components/list";
import User from "../components/user";
import Placeholder from "../components/UI/skeleton";

import { personAddOutline, refreshOutline } from "ionicons/icons";

const Users = (props) => {
	const [userSelected, selectUser] = useState(null);
	const [isModalVisibile, setModalState] = useState(false);
	const [userAlert, setUserAlert] = useState(false);
	const [isRefreshing, doRefresh] = useState(false);

	useEffect(() => {
		props.onLoadUserSubscribed();
	}, [isRefreshing, props.isUserCreated]);

	const handleSelection = (user) => {
		selectUser(user);
		setModalState(true);
	};
	const addUser = (params) => {
		props.onUserRegistration(params);
	};

	const refresh = (event) => {
		doRefresh(true);
		setTimeout(() => {
			doRefresh(false);
			event.detail.complete();
		}, 2000);
	};

	return (
		<IonPage id="page-users" className="bg-gray-900">
			<IonContent>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>Users</IonTitle>
						<IonButtons slot="end">
							<IonButton color="primary" onClick={() => setUserAlert(true)}>
								<IonIcon slot="icon-only" ios={personAddOutline} md={personAddOutline} />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen="true" className="container mx-auto bg-gray-100">
					<IonRefresher slot="fixed" onIonRefresh={refresh}>
						<IonRefresherContent
							pullingIcon={refreshOutline}
							pull-factor="200"
							pullingText="Pull to refresh"
							refreshingSpinner="crescent"
							refreshingText="Refreshing..."
						></IonRefresherContent>
					</IonRefresher>
					{props.isLoading ? <Placeholder rows={10} /> : <List users={props.users} onSelectUser={(user) => handleSelection(user)} />}
				</IonContent>
				<IonModal
					isOpen={isModalVisibile}
					showBackdrop={false}
					swipeToClose={true}
					cssClass="modalParse"
					onDidDismiss={() => setModalState(false)}
				>
					<User user={userSelected} closeModal={setModalState} />
				</IonModal>
				<IonAlert
					isOpen={userAlert}
					onDidDismiss={() => setUserAlert(false)}
					cssClass="my-custom-class"
					header={"New User registration"}
					message={"Register a new user filling out every field"}
					inputs={[
						{
							name: "name",
							type: "text",
							placeholder: "User name",
						},
						{
							name: "email",
							tyep: "email",
							placeholder: "Email",
						},
						{
							name: "password",
							type: "password",
							placeholder: "Password",
							cssClass: "specialClass",
							attributes: {
								minLength: 8,
							},
						},
					]}
					buttons={[
						{
							text: "Cancel",
							role: "cancel",
						},
						{
							text: "Ok",
							handler: (values) => {
								// console.log('values', values)
								addUser(values);
							},
						},
					]}
				/>
			</IonContent>
		</IonPage>
	);
};

const mapStateToProps = (state) => {
	return {
		users: state.user.userList,
		userRegistered: state.user.message,
		isLoading: state.app.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onLoadUserSubscribed: () => dispatch(loadUsers()),
		onUserRegistration: (params) => dispatch(userRegistration(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
