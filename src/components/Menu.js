import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { setDarkMode, setDevMode } from "../store/actions";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from "@ionic/react";

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
	const dispatch = useDispatch();
	const { darkMode, devMode } = useSelector(state => state.app);

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list" className="flex flex-col sm:flex-row sm:justify-around">
					<div className="w-100 h-screen bg-white">
						<IonListHeader className="flex items-center text-center mt-10 pb-4">MyChicMirror Admin</IonListHeader>
						{appPages.map((appPage, index) => {
							return (
								<IonMenuToggle key={index} autoHide={false}>
									<IonItem
										className="flex items-center py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
										lines="none"
										detail={false}
										onClick={() => dispatch(push(appPage.url))}
									>
										<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
										<IonLabel>{appPage.title}</IonLabel>
									</IonItem>
								</IonMenuToggle>
							);
						})}
						<hr />
						<div className="pt-5">
							<IonItem>
								<IonIcon slot="start" icon={moonOutline}></IonIcon>
								<IonLabel>Dark Mode</IonLabel>
								<IonToggle checked={darkMode} onIonChange={() => dispatch(setDarkMode(!darkMode))} />
							</IonItem>
							<IonItem>
								<IonIcon slot="start" icon={cogOutline}></IonIcon>
								<IonLabel>Dev Mode</IonLabel>
								<IonToggle checked={devMode} onIonChange={() => dispatch(setDevMode(!devMode))} />
							</IonItem>
							{labels.map((label, index) => (
								<IonItem lines="none" key={index}>
									<IonIcon slot="start" icon={bookmarkOutline} />
									<IonLabel>{label}</IonLabel>
								</IonItem>
							))}
						</div>
					</div>

				</IonList>
				<div className="absolute bottom-0 my-10">
					<div className="flex items-center py-2 px-8 text-gray-600 hover:text-gray-500">
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM10 7C9.63113 7 9.3076 7.19922 9.13318 7.50073C8.85664 7.97879 8.24491 8.14215 7.76685 7.86561C7.28879 7.58906 7.12543 6.97733 7.40197 6.49927C7.91918 5.60518 8.88833 5 10 5C11.6569 5 13 6.34315 13 8C13 9.30622 12.1652 10.4175 11 10.8293V11C11 11.5523 10.5523 12 10 12C9.44773 12 9.00001 11.5523 9.00001 11V10C9.00001 9.44772 9.44773 9 10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
						</svg>
						<span className="mx-4 font-medium">Support</span>
					</div>
				</div>
			</IonContent>
		</IonMenu>
	);
};
export default Menu;
