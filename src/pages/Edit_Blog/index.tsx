import Layout from "../../layout";
import { PageTitle } from "../../utils";
import style from "./style.module.css";
import { Box, Button, Container, Grid } from "@mui/material";
import { useState } from "react";
import { UpdateBlogApi } from "../../api/internal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert } from "../../components";
import SpinnerLoader from "../../components/ButtonLoader";
import { useNavigate, useParams } from "react-router-dom";


const EditBlog: React.FC = () => {


    const params = useParams();
    const blogId = params.id;
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);


    const author = useSelector((state: any) => state.user._id);

    const getPhoto = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const submitHandler = async () => {
        setLoading(true)
        let data;
        if (photo.includes("http")) {
            data = {
                author,
                title,
                content,
                blogId,
            };
        } else {
            data = {
                author,
                title,
                content,
                photo,
                blogId,
            };
        }

        const response: any = await UpdateBlogApi(data);

        if (response.status === 200) {
            setTitle("")
            setContent("")
            setPhoto("")
            setLoading(false)
            toast.success(response.data.message)
            setTimeout(() => {
                navigate("/blogs")
            }, 1000)
        }
    };

    return (
        <Layout>
            <section className={style.auth__login}>
                <h4>Edit your Blog </h4>
                <PageTitle title="Edit a Blog" />

                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item lg={6} md={6} xs={12} sx={{ mx: 'auto' }}>
                            <form onSubmit={submitHandler}>
                                <div className={style.input__boxess}>
                                    <label htmlFor="title">Change Title</label>
                                    <input
                                        type='text'
                                        placeholder="Enter blog heading "
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className={style.input__boxess}>
                                    <label htmlFor="content">Change Content</label>
                                    <textarea
                                        id='content'
                                        placeholder="Enter your content "
                                        maxLength={400}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                <div className={style.input__boxess}>
                                    <label className={style.upload_btn} htmlFor="photo">Change Image</label>
                                    <input
                                        className={style.input__hidden}
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        accept="image/jpg, image/jpeg, image/png"
                                        onChange={getPhoto}
                                    />
                                </div>

                                <Box className={style.photo_Box}>
                                    {photo !== "" ? <img src={photo} /> : ""}
                                </Box>
                                <Button className={style.btn_wrap} variant="outlined" onClick={submitHandler} >
                                    {
                                        loading ? <SpinnerLoader /> : `Update Blog`
                                    }
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                    <Alert />
                </Container>
            </section>
        </Layout>
    )
}

export default EditBlog