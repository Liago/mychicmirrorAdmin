import React from "react";
import { Form } from "semantic-ui-react";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const renderInputField = ({ input, label, placeholder, type, required, meta: { touched, error } }) => {

    return (
        <>
            <Form.Input
                label={label}
                {...input}
                id={input.name}
                type={type}
                required={required}
                placeholder={placeholder}
            />
            {touched && error && <div className="text-danger border-top border-danger w-100 mt-1">{error}</div>}
        </>
    );
}

const renderCheckboxField = ({ input, label, meta: { touched, error } }) => {

    return (
        <>
            <input {...input} id={input.name} type="checkbox" />
            <label className="form-check-label" htmlFor={input.name}>{label}</label>
            {touched && error && <div className="text-danger border-top border-danger w-100 mt-1">{error}</div>}
        </>
    );
};
const renderTextArea = ({ input, label, placeholder, rows, type, required, renderInline, meta: { touched, error } }) => {

    const renderField = () => {
        return (
            <>
                <textarea {...input} id={input.name} type={type} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" rows={rows} required={required} placeholder={placeholder} />
                {touched && error && <div className="text-danger border-top border-danger w-100 mt-1">{error}</div>}
            </>
        )
    }

    return (
        <div className={`form-group ${renderInline ? 'row' : ''}`} >
            {label && <label htmlFor={input.name} className={renderInline ? 'col-12 col-lg-3' : ''}>{label}</label>}
            {renderInline ?
                <div className="col-12 col-lg-9">{renderField()}</div>
                :
                renderField()
            }
        </div >
    );
}

// const RenderDatePicker = ({ selected, input, label, maxDate, dateFormat, placeholder, changeDate, meta: { touched, error } }) => {

//     return (
//         <>
//             <label htmlFor={input.name}>{label}</label>
//             <DatePicker
//                 selected={selected}
//                 maxDate={maxDate ? maxDate : null}
//                 placeholderText={placeholder}
//                 dateFormat={dateFormat}
//                 isClearable
//                 showMonthDropdown
//                 showYearDropdown
//                 dropdownMode="select"
//                 onChange={changeDate}
//             />
//             {touched && error && <div className="text-danger border-top border-danger w-100 mt-1">{error}</div>}
//         </>
//     );
// };

export {
    renderInputField,
	renderCheckboxField,
	renderTextArea
};