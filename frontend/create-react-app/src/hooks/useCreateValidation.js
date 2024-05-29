// useFormValidation.js
import { useState } from 'react';

export default function useCreateValidation() {
    const [formState, setFormState] = useState({
        email: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
    });

    const [isEmpty, setIsEmpty] = useState({
        email: true,
        verificationCode: true,
        password: true,
        confirmPassword: true,
    });

    const [touched, setTouched] = useState({
        email: false,
        verificationCode: false,
        password: false,
        confirmPassword: false,
    });

    const checkEmpty = async (name, value) => {
        setIsEmpty(prevState => ({
            ...prevState,
            [name]: !value.trim(),
        }));
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleBlur = (e) => {
        checkEmpty(e.target.name, e.target.value);
        setTouched(prevState => ({
            ...prevState,
            [e.target.name]: true,
        }));
    };

    return { formState, handleChange, handleBlur, isEmpty, touched, };
}