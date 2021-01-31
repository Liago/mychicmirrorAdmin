import React from "react";
import _ from "lodash"; 
import { useSelector, useDispatch } from "react-redux";

import { SecureStorage } from '@ionic-native/secure-storage';

import { IonList } from "@ionic/react";
import { Card, Icon, Label, Segment } from "semantic-ui-react";
import { GetUserAvatar } from "../store/rest"

const List = (props) => {
	const loading = useSelector(state => state.loading)
	const dispatch = useDispatch();
	
	const userAvatar = (username) => {
		const { data, loading, error } = GetUserAvatar({ "username": username });
		data && console.log('ussr', data.user[0].avatar)
	}


	return (
		<IonList inset={true}>
			<div className="list-component">
				{props.users.map((user, index) => {
					return (
						<div className="flex bg-white shadow-lg rounded-lg mx-4 mx-auto my-5 border" key={index} onClick={() => props.onSelectUser(user)}>
							<div className="w-full flex items-start px-4 py-6">
								{/* <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="../images/default_avatar.jpg" alt="avatar" /> */}

								<div className="w-12 h-12 rounded-full object-cover mr-4 shadow" dangerouslySetInnerHTML={userAvatar(user.username)} ></div>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<h2 className="text-lg font-semibold text-blue-500 mt-1">{user.username} </h2>
									</div>
									<p className="text-gray-700 text-sm">{user.email}</p>
									{/* <p className="mt-3 text-gray-700 text-sm">01/01/2020</p> */}
									<div className="mt-4 flex justify-end">
										<div className="flex mr-2 text-gray-700 text-sm mr-3">
											<svg fill={`${user.playerID ? "green" : "grey"}`} viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke={`${user.playerID ? "green" : "grey"}`}>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
											</svg>
										</div>
										{/* <div className="flex mr-2 text-gray-700 text-sm mr-8">
											<svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
											</svg>
											<span>8</span>
										</div> */}
										{/* <div className="flex mr-2 text-gray-700 text-sm mr-4">
											<svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
											</svg>
											<span>share</span>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</IonList >
	);
};

export default List;
