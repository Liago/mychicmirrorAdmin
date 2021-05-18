import { size, isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
} from "@ionic/react";

import CommentsList from "../components/allComments";
import { GetAllCommentsHandler } from "../store/rest";

import Placeholder from "../components/UI/placeholder";
import { refreshOutline } from "ionicons/icons";
import { Icon } from "semantic-ui-react";

const HomePage = (props) => {
	const [isRefreshing, doRefresh] = useState(false);
	const [view, setView] = useState("all");
	const [getAllComments, { data: allComments, loading: isLoading }] = GetAllCommentsHandler();


	useEffect(() => {
		getAllComments();
	}, []);

	const refresh = (event) => {
		doRefresh(true);
		getAllComments();
		setTimeout(() => {
			doRefresh(false);
			event?.detail?.complete();
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
