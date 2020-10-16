import React from "react";
import { Placeholder, Segment } from "semantic-ui-react";

const listPlaceholder = (props) => {
	return (
		<div className="ion-padding custom-skeleton">
			{[...Array(props.rows)].map((o, i) => {
				return (
					<Segment raised key={i}>
						<Placeholder>
							<Placeholder>
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder>
							<Placeholder.Paragraph>
								<Placeholder.Line length="medium" />
								<Placeholder.Line length="short" />
							</Placeholder.Paragraph>
						</Placeholder>
					</Segment>
				);
			})}
		</div>
	);
};

export default listPlaceholder;
