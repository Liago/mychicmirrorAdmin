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
};