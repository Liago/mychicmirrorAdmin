import React from "react";
import { connect } from "react-redux";
import { setDarkMode } from "../store/actions/";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle } from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
	archiveOutline,
	archiveSharp,
	bookmarkOutline,
	heartOutline,
	heartSharp,
	mailOutline,
	mailSharp,
	paperPlaneOutline,
	paperPlaneSharp,
	trashOutline,
	trashSharp,
	warningOutline,
	warningSharp,
	moonOutline,
	peopleOutline,
	peopleSharp,
	notifications,
} from "ionicons/icons";
import "./Menu.css";

const appPages = [
	{
		title: "Users",
		url: "/users",
		iosIcon: peopleSharp
	},
	{
		title: "Notifications",
		url: "/notifications",
		iosIcon: notifications
	},
	// {
	// 	title: "Favorites",
	// 	url: "/page/Favorites",
	// 	iosIcon: heartOutline,
	// 	mdIcon: heartSharp,
	// },
	// {
	// 	title: "Archived",
	// 	url: "/page/Archived",
	// 	iosIcon: archiveOutline,
	// 	mdIcon: archiveSharp,
	// },
	// {
	// 	title: "Trash",
	// 	url: "/page/Trash",
	// 	iosIcon: trashOutline,
	// 	mdIcon: trashSharp,
	// },
	// {
	// 	title: "Spam",
	// 	url: "/page/Spam",
	// 	iosIcon: warningOutline,
	// 	mdIcon: warningSharp,
	// },
];

// const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];
const labels = [];

const Menu = (props) => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>Inbox</IonListHeader>
					<IonNote>hi@ionicframework.com</IonNote>
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
						<IonToggle checked={props.darkMode} onClick={() => props.setDarkMode(!props.darkMode)} />
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

const mapStateToProps = (state) => {
	return {
		darkMode: state.app.darkMode,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setDarkMode: (dark) => dispatch(setDarkMode(dark)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
