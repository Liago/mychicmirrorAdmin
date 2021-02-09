import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { setDarkMode, setDevMode } from "../store/actions";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle } from "@ionic/react";

import { useLocation } from "react-router-dom";
import { bookmarkOutline, moonOutline, peopleSharp, notifications, chatbubblesOutline, cogOutline } from "ionicons/icons";

const appPages = [
	{
		title: "Comments",
		url: "/home",
		iosIcon: chatbubblesOutline,
	},
	{
		title: "Users",
		url: "/users",
		iosIcon: peopleSharp,
	},
	{
		title: "Notifications",
		url: "/notifications",
		iosIcon: notifications,
	},
];

// const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];
const labels = [];

const Menu = (props) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { darkMode, devMode } = useSelector(state => state.app);


	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>MyChicMirror Admin</IonListHeader>
					<IonNote>info@mychicmirror.com</IonNote>
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? "selected" : ""}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>

				<IonList id="labels-list">
					<IonListHeader>Settings</IonListHeader>
					<IonItem>
						<IonIcon slot="start" icon={moonOutline}></IonIcon>
						<IonLabel>Dark Mode</IonLabel>
						<IonToggle checked={props.darkMode} onClick={() => dispatch(setDarkMode(!darkMode))} />
					</IonItem>
					<IonItem>
						<IonIcon slot="start" icon={cogOutline}></IonIcon>
						<IonLabel>Dev Mode</IonLabel>
						<IonToggle checked={props.devMode} onClick={() =>  dispatch(setDevMode(!devMode))} />
					</IonItem>
					{labels.map((label, index) => (
						<IonItem lines="none" key={index}>
							<IonIcon slot="start" icon={bookmarkOutline} />
							<IonLabel>{label}</IonLabel>
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};
export default Menu;
