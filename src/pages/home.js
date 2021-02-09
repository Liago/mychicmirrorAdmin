import { size, isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonSegment,
	IonSegmentButton,
	IonTitle,
	IonToolbar,
	useIonViewWillEnter,
} from "@ionic/react";

import CommentsList from "../components/allComments";
import { GetAllCommentsHandler } from "../store/rest";

import Placeholder from "../components/UI/placeholder";
import { refreshOutline } from "ionicons/icons";
import { Icon } from "semantic-ui-react";

const HomePage = (props) => {
	// console.log("HOMEPAGE props", props);
	const dispatch = useDispatch();
	const [isRefreshing, doRefresh] = useState(false);
	const [view, setView] = useState("all");
	const [loading, setLoading] = useState(false);
	// const [allComments, setAllComments] = useState(null);
	const [spam, setspam] = useState(null)
	const [getAllComments, { data: allComments, loading: isLoading }] = GetAllCommentsHandler();
	const { isloading, notificationMessage, isMessageDelete } = useSelector(state => state.app)


	useEffect(() => {
		getAllComments();
	}, []);


	// const readComments = () => {
	// 	setLoading(true);
	// 	(async () => {
	// 		try {
	// 			const response = await props.onLoadAllComments();
	// 			console.log("response.allComments.comments", response);
	// 			setAllComments(response.allComments.comments);
	// 			setspam(response.allComments.total_spam);
	// 			setLoading(response.loading);
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	})();
	// };

	const refresh = (event) => {
		doRefresh(true);
		// readComments();
		setTimeout(() => {
			doRefresh(false);
			getAllComments();
			// event.detail.complete();
		}, 2000);
	};

	const showComments = () => {
		return isLoading
			?  <Placeholder rows={10} />
			: <CommentsList
				list={allComments}
				view={view}
				doRefresh={() => refresh()}
				avatar={"images/default_avatar.jpg"}
			/>

	};

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{!isLoading && <>Last {size(allComments.comments)} comments</>}</IonTitle>
				</IonToolbar>
				<IonToolbar>
					<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
						<IonSegmentButton value="all">
							{isLoading
								? <Icon className="icons asterisk loading inverted grey" />
								: `Comments ${size(allComments.comments) - parseInt(allComments.total_spam)}`}
						</IonSegmentButton>
						<IonSegmentButton value="spam" color="red">
							{isLoading
								? <Icon className="icons asterisk loading inverted grey" />
								: `Spam ${allComments.total_spam}`}
						</IonSegmentButton>
					</IonSegment>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen="true">
				<IonRefresher slot="fixed" onIonRefresh={refresh}>
					<IonRefresherContent
						pullingIcon={refreshOutline}
						pull-factor="200"
						pullingText="Pull to refresh"
						refreshingSpinner="crescent"
						refreshingText="Refreshing..."
					></IonRefresherContent>
				</IonRefresher>
				{showComments()}
			</IonContent>
		</IonPage>
	);
};

export default HomePage;
