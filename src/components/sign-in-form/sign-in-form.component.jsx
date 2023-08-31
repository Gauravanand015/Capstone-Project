import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  // signInWithGooglePopup,
} from "../../utils/firebase.utlis";
import FormInput from "../form-input/form-input.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //   console.log(formFields);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await signInAuthUserWithEmailAndPassword(email, password);
      // console.log(response);
      dispatch(emailSignInStart(email,password));
      resetFields();
    } catch (error) {
      // console.log(error.code)
      switch (error.code) {
        case "auth/user-not-found":
          alert("Email is not found");
          break;
        case "auth/wrong-password":
          alert("Password is wrong");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>Sign In</h2>
      <span>Already have an account?</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
