// import * as rest from "../../helpers/rest";
// import * as actionTypes from "./actionTypes";
// import { toastSetValue } from "./toast";
// import { sendNotification } from "./users";


// export const updateComment = (params) => {
// 	let isDelete = false;
// 	return (dispatch) => {
// 		dispatch(commentUpdateStart());
// 		rest.updateComment(params)
// 		.then((response) => {
// 			if (params.operation === 'delete') isDelete = true;  
// 			response.data.success ? dispatch(commentUpdateSuccess(response.data.success, isDelete)) : dispatch(commentUpdateFail(response.data))
// 		})
// 		.catch((error) => {
// 			dispatch(commentUpdateFail(error))
// 		})
// 	}
// }
// export const sendCommentReply = (params, notificationParams) => {
// 	return (dispatch) => { 
// 		dispatch(replyCommentStart());
// 		rest.sendCommentReply(params)
// 		.then((response) => {
// 			dispatch(toastSetValue({
// 				isCompleted: true,
// 				color: "success",
// 				position: "bottom",
// 				message: `Comment sent!`,
// 				duration: 1000
// 			}))
// 			dispatch(replyCommentSuccess(response.data))
// 			dispatch(sendNotification(notificationParams))
// 		})
// 		.catch((error) => {
// 			alert(error.message)
// 			dispatch(replyCommentFail("Identificato un commento duplicato; sembra che tu abbia già scritto questo commento"))
// 		})
// 	}
// }