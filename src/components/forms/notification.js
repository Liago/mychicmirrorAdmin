import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { Button, Divider, Form } from "semantic-ui-react";
import { renderInputField } from "./render.js";

const notificationForm = (props) => {
	const { handleSubmit, pristine, submitting } = props;
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Field>
					<Field name="titolo" type="text" component={renderInputField} label="Titolo" placeholder="..." required={false} />
					<Field name="contenuto" type="text" component={renderInputField} label="Contenuto" placeholder="..." required={false} />
				</Form.Field>
			</Form>
			<Divider />
			<Button className="ui primary button" type="submit" positive disabled={pristine || submitting}>
				Invia
			</Button>
			<Button type="button" disabled={pristine || submitting} onClick={() => props.onClearForm()}>
				Clear
			</Button>
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
})(connect(null, mapDispatchToProps)(notificationForm));
