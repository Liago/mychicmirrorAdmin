import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => {
	return (
		<>
			{[...Array(props.cards)].map((o, i) => {
				return (
					<div className="bg-white relative shadow-xl w-11/12 mx-auto mt-5 shadow-xl rounded border">
						<ContentLoader
							speed={2}
							width={350}
							height={160}
							viewBox="0 0 400 160"
							backgroundColor="#f3f3f3"
							foregroundColor="#ecebeb"
							{...props}
						>
							<rect x="20" y="5" rx="3" ry="3" width="52" height="6" />
							<rect x="20" y="109" rx="3" ry="3" width="330" height="6" />
							<rect x="20" y="125" rx="3" ry="3" width="280" height="6" />
							<rect x="20" y="141" rx="3" ry="3" width="178" height="6" />
							<rect x="20" y="38" rx="0" ry="0" width="334" height="17" />
							<rect x="20" y="62" rx="0" ry="0" width="138" height="17" />
						</ContentLoader>
					</div>
				);
			})}
		</>
	)
}



export default Placeholder;