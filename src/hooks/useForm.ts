import * as React from 'react';
import { useState } from 'react';

const useForm=<T extends object> (initialData: T, onSubmit: (formData: T) => void) => {
    const [formData, setformData] = useState(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try{
            onSubmit(formData)
        }
        catch (e) {
            console.error(e)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    return ( {formData, handleChange, handleSubmit} );
}
 
export default useForm;

