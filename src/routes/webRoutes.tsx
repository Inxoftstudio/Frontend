import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Error, Login, Signup, CryptoCurrency, Blogs, SubmitBlog, BlogDetail, EditBlog } from '../pages';
import ProtectedRoute from './protectedRoutes';
import { useSelector } from 'react-redux';
import useAutoLogin from '../hooks/autoLogin';
import { PageLoader } from '../components';



const WebRoutes: React.FC = () => {

  const isAuthenticated =  useSelector((state: any) => state.user.auth);

  const loading = useAutoLogin();

  return loading ? (
    <PageLoader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrency" element={<CryptoCurrency />} />
 
        <Route path="/blogs"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <Blogs />
            </ProtectedRoute>
          } />

        <Route path="/blog/:id"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <BlogDetail />
            </ProtectedRoute>
          } />



        <Route path="/blog-update/:id"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <EditBlog />
            </ProtectedRoute>
          } />








        <Route path="/write-blog"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <SubmitBlog />
            </ProtectedRoute>
          } />


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default WebRoutes;