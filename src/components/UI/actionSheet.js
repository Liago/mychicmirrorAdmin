import React from "react";
import { IonActionSheet } from "@ionic/react";
import { close } from "ionicons/icons";

const ActionSheet = ({ showActionSheet, comment, onCommentUpdate, doRefresh, setShowActionSheet }) => {
	const mybuttons = [
		{
			text: "Approva",
			handler: () => {
				onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
				doRefresh();
			},
		},
		{
			text: "Disapprova",
			handler: () => {
				onCommentUpdate({ id: comment.comment_ID, status: "0", operation: "update" });
				doRefresh();
			},
		},
		{
			text: "Sposta in spam",
			handler: () => {
				onCommentUpdate({ id: comment.comment_ID, status: "1", operation: "update" });
				doRefresh();
			},
		},
		{
			text: "Elimina",
			role: "destructive",
			handler: () => {
				onCommentUpdate({ id: comment.comment_ID, status: "", operation: "delete" });
				doRefresh();
			},
		},
		{
			text: "Annulla",
			icon: close,
			role: "cancel",
		},
	];

	return (
		<IonActionSheet
			isOpen={showActionSheet}
			onDidDismiss={() => setShowActionSheet(false)}
			cssClass="my-custom-class"
			buttons={mybuttons}
		/>
	)
}
export default ActionSheet;