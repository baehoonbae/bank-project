// useFormValidation.js
import { useState } from 'react';

export default function useFormValidation() {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        birthDate: '',
        phoneNumber: '',
        verificationCode: '',
    });

    const [isEmpty, setIsEmpty] = useState({
        username: true,
        password: true,
        name: true,
        email: true,
        birthDate: true,
        phoneNumber: true,
        verificationCode: true,
    });

    const [touched, setTouched] = useState({
        username: false,
        password: false,
        name: false,
        email: false,
        birthDate: false,
        phoneNumber: false,
        verificationCode: false,
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