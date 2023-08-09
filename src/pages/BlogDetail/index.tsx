import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../layout";
import { CommentList, PageLoader , Alert} from "../../components";
import { BlogApi, DeleteBlogApi, GetCommentBlogApi, PostCommentBlogApi } from "../../api/internal";
import { PageTitle } from "../../utils";
import { Box, Button, Container, Grid } from "@mui/material";
import { toast } from "react-toastify";


interface Blog {
  _id: string;
  content: string;
  title: string;
  photo: string;
  createdAt: string;
  authorName: string;
  authorUsername: string;
}

const BlogDetail: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);
  const [ownsBlog, setOwnsBlog] = useState(false);


  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;

  const username = useSelector((state: any) => state.user.username);
  const userId = useSelector((state: any) => state.user._id);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const blogResponse: any = await BlogApi(blogId);
      const commentResponse: any = await GetCommentBlogApi(blogId);
      if (blogResponse.status === 200) {
        setBlog(blogResponse.data.blog);
        setOwnsBlog(username === blogResponse.data.blog.authorUsername);
      }
      if (commentResponse.status === 201) {
        setComments(commentResponse.data.data);
      }
      setIsLoading(false)
    })();


  }, [reload]);


  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };

    const response: any = await PostCommentBlogApi(data);

    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  const deleteBlog = async () => {
    const response: any = await DeleteBlogApi(blogId);
    if (response.status === 200) {
      toast.success("Blog Deleted Successfully");
      setTimeout(()=> {
          navigate('/blogs')
      }, 1000)
    }
  };


  if (isLoading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    )
  }

  return (
    <Layout>
      <PageTitle title="Blogs Detail" />
      <section>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8} >
              <Box className={style.blogContent}>



                <Box className={style.blogHeader}>
                  <h4 className={style.authorDetail}>
                    {blog?.createdAt &&
                      `Posted by  ${blog?.authorUsername}  on ${new Date(blog.createdAt).toDateString()}`
                    }
                  </h4>

                  {ownsBlog && (
                    <Box className={style.buttonsMain}> 
                      <Button variant="contained" color="success" onClick={() =>  navigate(`/blog-update/${blog?._id}`)}>  Edit </Button>
                      <Button variant="contained" color="error" onClick={deleteBlog}>  Delete </Button>
                    </Box>
                    )
                  }
                </Box>




                <img src={blog?.photo} />
                <h1>{blog?.title}</h1>
                <p>{blog?.content}</p>
                <Button variant="contained" onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <CommentList comments={comments} />
              <Box className={style.commentNow}>
                <input placeholder="Enter your comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button variant="contained" color="success" onClick={postCommentHandler}>  Post </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Alert />
    </Layout>
  )
}

export default BlogDetail;