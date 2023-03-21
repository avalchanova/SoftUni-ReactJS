import { useState } from "react";
//hooks can use other hooks

export const useForm = (initialValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(1);
        console.log(onSubmitHandler);

        if (onSubmitHandler) {
            onSubmitHandler(formValues);
        }
    };

    return {
        formValues,
        onChangeHandler,
        onSubmit
    }; //can be returned in array instead of obj
};

