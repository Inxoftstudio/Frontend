import { useState } from "react";
import { Container, Grid, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import Layout from "../../layout"
import { PageTitle } from "../../utils/index"
import style from "./style.module.css"
import SignupSchema from "../../schemas/signupSchema.js";
import { SignUpApi } from "../../api/internal.js"
import { setUser } from "../../redux/userSlice.js"
import { toast } from "react-toastify";
import SpinnerLoader from "../../components/ButtonLoader/index.js";
import { Alert } from "../../components/index.js";

interface SignupFormValues {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {

    const [showHidePassword, setShowHidePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        setLoading(true)
        const data = {
            name: values.name,
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: values.email,
        };

        const response: any = await SignUpApi(data);

        if (response.status === 201) {
            // setUser
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                auth: response.data.auth,
                name: response.data.name
            };

            dispatch(setUser(user));
            setLoading(false)
            toast.success("Account Created Successfully");

            setTimeout(() => {
                navigate('/')
            }, 1000)

        } else {
            setLoading(false)
            toast.error(response.response.data.message);
        }
    };

    const { values, touched, handleBlur, handleChange, errors, handleSubmit } = useFormik<SignupFormValues>({

        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
            console.log(values);
            await handleSignUp();
            action.resetForm()
        },
    });

    const showPassword = () => {
        setShowHidePassword(!showHidePassword)
    }

    return (
        <Layout>
            <section className={style.auth__login}>
                <h4>Welcome To Coinbase :) </h4>
                <PageTitle title="Signup Account" />
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item lg={4} md={6} xs={12} sx={{ mx: 'auto' }}>

                            <div className={style.input__boxess}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type='text'
                                    value={values.name}
                                    name="name"
                                    id="name"
                                    onBlur={handleBlur}
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                />
                                {errors.name && touched.name ? <p className={style.error}>{errors.name}</p> : undefined}
                            </div>

                            <div className={style.input__boxess}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type='email'
                                    value={values.email}
                                    name="email"
                                    id="email"
                                    onBlur={handleBlur}
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email ? <p className={style.error}>{errors.email}</p> : undefined}
                            </div>


                            <div className={style.input__boxess}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type='text'
                                    value={values.username}
                                    name="username"
                                    id="username"
                                    onBlur={handleBlur}
                                    placeholder="Enter username"
                                    onChange={handleChange}
                                />
                                {errors.username && touched.username ? <p className={style.error}>{errors.username}</p> : undefined}
                            </div>

                            <div className={`${style.input__boxess}  ${style.password_show_hide} `}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showHidePassword ? 'text' : "password"}
                                    id='password'
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password ? <p className={style.error}>{errors.password}</p> : undefined}
                                <div className={style.show__hide} onClick={showPassword}>
                                    <span> {showHidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}  </span>
                                </div>
                            </div>

                            <div className={`${style.input__boxess}  ${style.password_show_hide} `}>
                                <label htmlFor="c_password">Confirm Password</label>
                                <input
                                    type="password"
                                    id='c_password'
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    onBlur={handleBlur}
                                    placeholder="Enter confirm password"
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && touched.confirmPassword ? <p className={style.error}>{errors.confirmPassword}</p> : undefined}
                            </div>

                            <Button variant="outlined" onClick={() => handleSubmit()}>
                                {
                                    loading ? <SpinnerLoader /> : `Create Account`
                                }
                            </Button>
                            <div className={style.register__line}>Already have an account ? <Link to="/login"> Login Now </Link>   </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Alert />
        </Layout>
    )
}

export default Signup