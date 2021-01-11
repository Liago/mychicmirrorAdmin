import React from "react";
import { IonList } from "@ionic/react";
import { connect } from "react-redux";
import { Card, Icon, Label, Segment } from "semantic-ui-react";

const list = (props) => {
	return (
		<IonList inset={true}>
			<div className="list-component">
				{props.users.map((user, index) => {
					return (
						<div key={index} onClick={() => props.onSelectUser(user)}>
							<div className="shadow-md group block rounded-lg p-4 border border-gray-200 my-3">
								<dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
									<div>
										<dd className="leading-6 font-medium text-blue-500">
											{user.username}
										</dd>
									</div>
									<div>
										<dd className="block mt-1 text-xs leading-tight font-normal text-gray-500">
											{user.email}
										</dd>
									</div>
									<div className="col-start-2 row-start-1 row-end-3">
										<dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
											<img src="../images/default_avatar.jpg" alt="" width="48" height="48" className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white" />
										</dd>
									</div>
								</dl>
							</div>
						</div>

						// <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-2 from-green-800 via-pink-500 to-green-100"
						// 	key={index}
						// 	onClick={() => props.onSelectUser(user)}
						// >
						// 	<div className="md:flex">
						// 		<div className="p-8">
						// 			<div className="tracking-wide text-sm text-blue-600 font-bold">{user.username}</div>
						// 			<div className="block mt-1 text-xs leading-tight font-normal text-gray-500 hover:underline">{user.email}</div>
						// 			<p className="mt-2 text-gray-500">
										// <Icon
										// 	className={`absolute top-0 right-0 icons ${user.playerID ? "inverted green" : "inverted grey"}`}
										// 	name={`${user.playerID ? "bell" : "bell slash outline"}`}
										// />
						// 			</p>
						// 		</div>
						// 	</div>
						// </div>

						// <Segment raised className="p-0" key={index}>
						// 	<Card onClick={() => props.onSelectUser(user)} className="w-100">
						// 		<Card.Content>
						// 			<Card.Header>{user.username}</Card.Header>
						// 			<Card.Meta>{user.email}</Card.Meta>
						// 		</Card.Content>
						// 		<Card.Content extra>
						// 			<Card.Description>
						// 				<Icon 
						// 					className={`icons ${user.playerID ? "inverted green":"inverted grey"}`} 
						// 					name={`${user.playerID ? "bell" : "bell slash outline"}`} 
						// 				/>
						// 			</Card.Description>
						// 		</Card.Content>
						// 	</Card>
						// </Segment>
					);
				})}
			</div>
		</IonList >
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
	};
};

export default connect(mapStateToProps)(list);
