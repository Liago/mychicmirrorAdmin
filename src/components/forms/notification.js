import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { Button, Divider, Form } from "semantic-ui-react";
import { renderInputField, renderTextArea } from "./render.js";

const NotificationForm = (props) => {
	const { handleSubmit, pristine, submitting, type } = props;
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Field>
					{type.title ? (
						<Field name="titolo" type="text" component={renderInputField} label="Titolo" placeholder="..." required={false} />
					) : null}
					{type.content === "comment" ? (
						<Field
							name="commento"
							type="text"
							component={renderTextArea}
							label="Commento"
							placeholder="Write down your comment"
							required={false}
						/>
					) : (
						<Field name="contenuto" type="text" component={renderInputField} label="Contenuto" placeholder="..." required={false} />
					)}
				</Form.Field>
				<Divider />
				<Button type="submit" className="ui primary button" positive disabled={pristine || submitting} >
					Invia
				</Button>
				<Button type="button" disabled={pristine || submitting} onClick={() => props.onClearForm()}>
					Clear
				</Button>
			</Form>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClearForm: () => dispatch(reset("notification")),
	};
};

export default reduxForm({
	form: "notification",
})(connect(null, mapDispatchToProps)(NotificationForm));
