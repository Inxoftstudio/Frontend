import * as yup from "yup";

const SignupSchema = yup.object().shape({

    name: yup.string().max(30).required("name is required"),

    username: yup.string().min(5).max(30).required("username is required"),

    email: yup.string().email("enter a valid email").required("email is required"),

    password: yup.string().min(8).max(25).required("password is required"),
  
    confirmPassword: yup.string().oneOf([yup.ref("password")], "passwords must match").required("confirm password is required"),

});

export default SignupSchema;