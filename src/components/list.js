import React from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { SecureStorage } from '@ionic-native/secure-storage';

import { GetUserAvatar } from "../store/rest"
import { Card,  CardBody, CardTitle } from "shards-react";


const List = (props) => {
	const loading = useSelector(state => state.loading)
	const dispatch = useDispatch();

	const userAvatar = (username) => {
		// const { data, loading, error } = GetUserAvatar({ "username": username });
		// data && console.log('ussr', data.user[0].avatar)
	}


	return (
		<div className="list-component pb-5">
			{props.users.map((user, index) => {
				return (
					<Card
						key={index}
						className="m-3"
						onClick={() => props.onSelectUser(user)}>
						<CardBody className="p-2">
							<CardTitle className="pt-3.5">
								<div className="w-full h-16 flex items-center justify-between ">
									<div className="flex">
										{/* <img className=" rounded-full w-10 h-10 mr-3" src={avatar} alt="" /> */}
										<div className="w-12 h-12 rounded-full object-cover mr-4 shadow" dangerouslySetInnerHTML={userAvatar(user.username)} ></div>
										<div>
											<h3 className="text-md font-semibold ">{user.username}</h3>
											<p className="text-xs text-gray-500">{user.email}</p>
										</div>
									</div>
								</div>
							</CardTitle>
							<div className="mr-2 text-gray-700 text-sm float-right">
								<svg fill={`${user.playerID ? "green" : "grey"}`} viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke={`${user.playerID ? "green" : "grey"}`}>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
								</svg>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default List;
