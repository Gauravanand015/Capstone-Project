import { useState } from "react";
import {
  createUserDocumentWithAuth,
  creteAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utlis";
import FormInput from "../form-input/form-input.component";



import './sign-up.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;



  console.log(formFields);

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password is not matching");
      return;
    }

    try {
      let res = await creteAuthUserWithEmailAndPassword(email, password);
      console.log(res);

      await createUserDocumentWithAuth(res.user, { displayName });
      alert("User Created");
      resetFields();

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use,try using different email");
        return;
      } else {
        console.log("Error while creating user with email and password", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
        <h2>Sign Up</h2>
        <span>Don't have an account?</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
            required: true,
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
            required: true,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            required: true,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            required: true,
          }}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
