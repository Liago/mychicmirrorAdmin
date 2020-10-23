import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import { getAllComments } from "../store/actions";
import Placeholder from "../components/UI/skeleton";
import { refreshOutline } from "ionicons/icons";

const HomePage = (props) => {
	// console.log("HOMEPAGE props", props);
	const [isRefreshing, doRefresh] = useState(false);
	const [view, setView] = useState("all");
	useEffect(() => {
		props.onLoadAllComments();
		if (props.isUpdated) {
			doRefresh(true);
			props.onLoadAllComments();
			setTimeout(() => {
				doRefresh(false);
			}, 2000);
		}
	}, [props.isUpdated]);

	const refresh = (event) => {
		doRefresh(true);
		props.onLoadAllComments();
		setTimeout(() => {
			doRefresh(false);
			event.detail.complete();
		}, 2000);
	};

	const showComments = () => {
		return props.isLoading ? (
			<Placeholder rows={10} />
		) : (
			<CommentsList list={props.allComments.comments} view={view} doRefresh={refresh} avatar={"images/default_avatar.jpg"} />
		);
	};

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>You have {size(props.allComments.comments)} comments</IonTitle>
				</IonToolbar>
				<IonToolbar>
					<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
						<IonSegmentButton value="all">Comments</IonSegmentButton>
						<IonSegmentButton value="spam">Spam</IonSegmentButton>
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
				{!props.allComments.success || isRefreshing ? <Placeholder rows={5} /> : showComments()}
			</IonContent>
		</IonPage>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.app.loading,
		allComments: state.app.allComments,
		isUpdated: state.app.notificationMessage,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onLoadAllComments: () => dispatch(getAllComments()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
