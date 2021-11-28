import React, { useState } from "react";

const useInput = (validateValue: any) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const valueIsValid = validateValue(enteredValue);
    const valueChangeHandler = (event: any) => {
        setEnteredValue(event.target.value);
    };

    const reset = () => {
        setEnteredValue('');
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        valueChangeHandler,
        reset
    };
};

export default useInput;