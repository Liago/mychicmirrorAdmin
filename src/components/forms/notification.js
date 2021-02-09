// import React from "react";
// import { Field, reduxForm, reset } from "redux-form";
// import { connect } from "react-redux";
// import { Button, Divider, Form } from "semantic-ui-react";
// import { renderInputField, renderTextArea } from "./render.js";

// const NotificationForm = (props) => {
// 	const { handleSubmit, pristine, submitting, type } = props;
// 	return (
// 		<>

// 			<form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={handleSubmit}>
// 				<div class="flex flex-wrap -mx-3 mb-6">
// 					<h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>

// 					{type.title ? (
// 						<Field name="titolo" type="text" component={renderInputField} label="Titolo" placeholder="..." required={false} />
// 					) : null}


// 					<div class="w-full md:w-full px-3 mb-2 mt-2">
// 						{type.content === "comment" ? (
// 							<Field
// 								name="commento"
// 								type="text"
// 								component={renderTextArea}
// 								label="Commento"
// 								placeholder="Scrivi il commento"
// 								required={false}
// 							/>
// 						) : (
// 								<Field name="contenuto" type="text" component={renderInputField} label="Contenuto" placeholder="..." required={false} />
// 							)}


// 						{/* <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea> */}
// 					</div>
// 					<div class="w-full md:w-full flex items-start md:w-full px-3">
// 						<div class="mr-1">
// 							<input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' />
// 						</div>
// 					</div>
// 				</div>
// 			</form>

// 		</>






// 	);
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onClearForm: () => dispatch(reset("notification")),
// 	};
// };

// export default reduxForm({
// 	form: "notification",
// })(connect(null, mapDispatchToProps)(NotificationForm));
