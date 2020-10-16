import React from "react";
import { Placeholder } from "semantic-ui-react";

const listPlaceholder = (props) => {
	return (
		<div className="ion-padding custom-skeleton">
			{[...Array(props.rows)].map((o, i) => {
				return (
					<Placeholder key={i}>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				);
			})}
		</div>
	);
};

export default listPlaceholder;
