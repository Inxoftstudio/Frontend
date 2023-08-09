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
import loginSchema from "../../schemas/loginSchema";
import { LoginApi } from "../../api/internal.js"
import { setUser } from "../../redux/userSlice.js"
import { Alert } from "../../components/index.js";
import { toast } from "react-toastify";
import SpinnerLoader from "../../components/ButtonLoader/index.js";

interface LoginFormValues {
    username: string;
    password: string;
}

const Login: React.FC = () => {

    const [showHidePassword, setShowHidePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    const handleLogin = async () => {

        setLoading(true)

        const data = {
            username: values.username,
            password: values.password
        }

        const response: any = await LoginApi(data);

        if (response.status === 200) {
            const user = {
                _id: response.data.user._id,
                username: response.data.user.username,
                email: response.data.user.email,
                auth: response.data.auth,
                name: response.data.name
            }
            dispatch(setUser(user));
            setLoading(false)
            toast.success("Login Successfully");

            setTimeout(()=> {
                navigate('/')
            }, 1000)
            
        } else  {
            setLoading(false)
            toast.error(response.response.data.message);
        }

    }

    const showPassword = () =>{
        setShowHidePassword(!showHidePassword)
    }

    const { values, touched, handleChange, handleBlur, errors, handleSubmit } = useFormik<LoginFormValues>({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values,action) => {
            console.log(values);
            await handleLogin();
            action.resetForm()
        },
    })

    return (
        <Layout>
            <section className={style.auth__login}>
                <h4>Welcome Back :) </h4>
                <PageTitle title="Login Account" />
                
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item lg={4} md={6} xs={12} sx={{ mx: 'auto' }}>
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
                                    <span> {showHidePassword ?<VisibilityOffIcon/> : <VisibilityIcon  />  }  </span>
                                </div>
                            </div>


                            <Button variant="outlined" onClick={() => handleSubmit()} >
                                {
                                    loading ? <SpinnerLoader />  :  `Login Account`
                                }
                            </Button>
                            <div className={style.register__line}>Dont have an account ?<Link to="/signup"> Register Now </Link>   </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Alert />
        </Layout>
    )
}

export default Login