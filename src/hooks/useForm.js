import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues); // <-- setValues is needed for the modal's resetForm

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues }; // <-- setValues MUST be exported
}

export default useForm;
