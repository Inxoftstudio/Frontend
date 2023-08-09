import * as yup from "yup";

const blogSchema = yup.object().shape({
    title: yup.string().min(5).max(30).required("blog title is required"),
    content: yup.string().min(100, "Content must be at least 100 characters").required("blog content is required"),
    photo: yup.mixed().required("Photo is required"),
});

export default blogSchema;