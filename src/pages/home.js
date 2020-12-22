import { size, isNil } from "lodash";
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
	useIonViewWillEnter,
} from "@ionic/react";

import CommentsList from "../components/allComments";
import { getAllComments } from "../store/actions";
import Placeholder from "../components/UI/skeleton";
import { refreshOutline } from "ionicons/icons";
import { Icon } from "semantic-ui-react";

const HomePage = (props) => {
	// console.log("HOMEPAGE props", props);
	const [isRefreshing, doRefresh] = useState(false);
	const [view, setView] = useState("all");
	const [loading, setLoading] = useState(false);
	const [allComments, setAllComments] = useState(null);
	const [spam, setspam] = useState(null)

	useIonViewWillEnter(() => {
		readComments();
	});

	const readComments = () => {
		setLoading(true);
		(async () => {
			try {
				const response = await props.onLoadAllComments();
				console.log("response.allComments.comments", response);
				setAllComments(response.allComments.comments);
				setspam(response.allComments.total_spam);
				setLoading(response.loading);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	const refresh = (event) => {
		doRefresh(true);
		readComments();
		setTimeout(() => {
			doRefresh(false);
			// event.detail.complete();
		}, 2000);
	};

	const showComments = () => {
		return loading || isNil(allComments) ? (
			<Placeholder rows={10} />
		) : (
				<CommentsList
					list={allComments}
					view={view}
					doRefresh={() => refresh()}
					avatar={"images/default_avatar.jpg"}
				/>
			);
	};

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Last {size(allComments)} comments</IonTitle>
				</IonToolbar>
				<IonToolbar>
					<IonSegment value={view} onIonChange={(e) => setView(e.detail.value)}>
						<IonSegmentButton value="all">
							{isNil(allComments) || loading
								? <Icon className="icons asterisk loading inverted grey" />
								: `Comments ${size(allComments) - parseInt(spam)}`}
						</IonSegmentButton>
						<IonSegmentButton value="spam" color="red">
							{isNil(spam) || loading
								? <Icon className="icons asterisk loading inverted grey" />
								: `Spam ${spam}`}
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

const mapStateToProps = (state) => {
	return {
		isLoading: state.app.loading,
		isUpdated: state.app.notificationMessage,
		isCommentDeleted: state.app.isMessageDelete,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onLoadAllComments: () => dispatch(getAllComments()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
