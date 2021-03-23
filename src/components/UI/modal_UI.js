import React, { useState, useEffect } from "react";
import { IonModal, IonSpinner } from "@ionic/react";
import { Card, CardHeader, CardBody } from "shards-react";
import { GetPost } from "../../store/rest";

// import UniversalForm from "../forms/universalForm";

const ModalNotification = (props) => {
	const [dimmerState, setDimmer] = useState(false);
	useEffect(() => {
		setDimmer(false);
	}, []);
	const [getPost, { data, loading }] = GetPost(props.postId);
	// const handleSubmit = (values) => {
	// 	setDimmer(true);
	// 	props.submitNotification({ titolo: values.titolo, contenuto: values.commento });
	// };


	useEffect(() => {
		props.open && getPost()
	}, [props.open])


	return (
		<IonModal
			isOpen={props.open}
			cssClass='comment-modal-class'
			swipeToClose={true}
			presentingElement={undefined}
			onDidDismiss={() => props.togglePostModal(false)}
			>
			<Card className="my-5 h-100 card">
				{loading && <div className="grid place-content-center h-100"><IonSpinner name="lines" /></div>}
				{!loading &&
					<>
						<CardHeader>
						<div className="absolute top-4 right-5 h-8 w-8 rounded-full " onClick={() => props.togglePostModal(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
							<h2 dangerouslySetInnerHTML={{ __html: data.title?.rendered.split(" / ")[0] }}></h2>
						</CardHeader>
						<CardBody className="overflow-y-scroll">
							<div
								className="font-sans text-lg text-justify"
								dangerouslySetInnerHTML={{ __html: data.content?.rendered.split("<hr>")[0] }}>
							</div>
						</CardBody>
					</>
				}
			</Card>
		</IonModal>

		// <Modal
		// 	size="small"
		// 	dimmer="inverted"
		// 	open={props.open}
		// 	onClose={() => props.modalToggler(false)}>
		// 	<Dimmer className={dimmerState ? "active" : ""}>
		// 		<Loader inverted>Sending...</Loader>
		// 	</Dimmer>
		// 	<Modal.Content>
		// 		<Card>
		// 			<Card.Content>
		// 				<Card.Header>
		// 					{props.title_content}
		// 				</Card.Header>
		// 			</Card.Content>
		// 			<Card.Content>
		// 				{/* <UniversalForm onSubmit={handleSubmit} type={props.type} /> */}
		// 				{props.content}
		// 			</Card.Content>
		// 		</Card>
		// 	</Modal.Content>
		// </Modal>
	);
};

export default ModalNotification;
