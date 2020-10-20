import { size } from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import CommentsList from "../components/allComments";
import { getAllComments } from "../store/actions";
import Placeholder from "../components/UI/skeleton";

const HomePage = (props) => {
	console.log("HOMEPAGE props", props);
	useEffect(() => {
		props.onLoadAllComments();
	}, []);

	const showComments = () => {
		return size(props.allComments) == 0 ? (
			<Placeholder rows={10} />
		) : (
			<CommentsList list={props.allComments.comments} avatar={"images/default_avatar.jpg"} />
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
			</IonHeader>
			<IonContent fullscreen="true">{showComments()}</IonContent>
		</IonPage>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.app.loading,
		allComments: state.app.allComments,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onLoadAllComments: () => dispatch(getAllComments()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
