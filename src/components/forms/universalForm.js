import React from "react";
import { useForm } from "react-hook-form";

const UniversalForm = (props) => {
	const { type } = props
	const { register, handleSubmit, watch, errors } = useForm();
	const onSubmit = data => {
		console.log(data);
		props.onSubmit(data);
	};

	return (
		<div className="border rounded-md shadow-md h-auto p-5 text-gray-800">
			<form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
				{type.title
					? <>
						<label className="block">Titolo notifica</label>
						<input
							className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 
							border-gray-100 bg-gray-100 focus:text-gray-900 focus:outline-none focus:border-gray-200"
							name="titolo"
							type="text"
							label="Titolo"
							placeholder="Titolo della notifica"
							ref={register} />
					</>
					: <h3>Commento</h3>
				}
				<hr />
				<textarea
					rows="10"
					name="commento"
					className="block w-full py-3 px-1 mt-2 
				text-gray-800 appearance-none 
				border-b-2 border-gray-100 bg-gray-100
				focus:text-gray-900 focus:outline-none focus:border-gray-200"
					ref={register({ required: true })}
				/>
				{errors.commento && <p className="text-red-600">This field is required</p>}
				<button type="submit" className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">Invia</button>
			</form>
		</div>
	)
}
export default UniversalForm;