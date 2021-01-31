// import * as rest from "../../helpers/rest";
import * as actionTypes from "./actionTypes";



// export const getAllComments = () => {
// 	return async (dispatch) => {
// 		dispatch(allCommentsStart());
// 		try {
// 			const response = await rest.getAllComments();
// 			if (response.status === 200) {
// 				dispatch(allCommentsSuccess());
// 				return { allComments: response.data, loading: false };
// 			} else {
// 				dispatch(allCommentsFail({error: "qualcosa è andato storto"}));
// 				return { allComments: null, loading: false };
// 			}
// 		} catch (error) {
// 			dispatch(allCommentsFail(error));
// 			console.log("getAllComments error", error);
// 			return { allComments: null, loading: false };
// 		}
// 	};
// };
