import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
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
import { GetUserList, UserRegistration } from "../store/rest";
import List from "../components/list";
import User from "../components/user";
import Placeholder from "../components/UI/placeholder";

import { personAddOutline, refreshOutline } from "ionicons/icons";

const Users = (props) => {
	const dispatch = useDispatch();
	const [userSelected, selectUser] = useState(null);
	const [isModalVisibile, setModalState] = useState(false);
	const [userAlert, setUserAlert] = useState(false);
	const [isRefreshing, doRefresh] = useState(false);	
	const [getUsers, { data: users, loading }] = GetUserList();

	useEffect(() => {
		getUsers();
	}, [isRefreshing])


	const handleSelection = (user) => {
		selectUser(user);
		setModalState(true);
	};
	const addUser = (params) => {
		dispatch(UserRegistration(params))
	};

	const refresh = (event) => {
		doRefresh(true);
		getUsers();
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
					{loading
						? <Placeholder cards={4} />
						: <List users={users.data} onSelectUser={(user) => handleSelection(user)} />}
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

export default Users;