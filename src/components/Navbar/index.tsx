import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './style.module.css';
import Grid from '@mui/material/Grid';
import logo from "../../assets/logo.png"
import { Container,Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { LogoutApi } from '../../api/internal';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/userSlice';



const pages = [
  { path: '/', label: 'Home' },
  { path: '/cryptocurrency', label: 'Cryptocurrency' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/write-blog', label: 'Write a blog' },
  { path: '/signup', label: 'Signup' },
];

const Navbar: React.FC = () => {

  const isAuthenticated = useSelector((state: any) => state.user.auth)
  const dispatch = useDispatch();
  const handleLogout = async() => {
    await LogoutApi();
    dispatch(resetUser())
  }

  return (
    <header>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={2}>
            <div className={style.header__logo}>
              <Link to="/" ><img src={logo} alt="logo" /> OINBASE</Link>
            </div>
          </Grid>
          <Grid item xs={8} sx={{ alignSelf: 'center' }}>
            <nav>
              {pages.map((page, index) => (
                <NavLink to={page.path} key={index} 
                  className={({ isActive }) => isActive ? style.active : style.inActive} >
                  {page.label}
                </NavLink>
              ))}
            </nav>
          </Grid>

          <Grid item xs={2} sx={{ alignSelf: 'center' }}>
            {isAuthenticated ?
              <Button variant='contained' className={style.logoutBTN} onClick={handleLogout}>
                <PersonIcon  /> Logout
              </Button>
              :
              <NavLink to="/login"
                className={({ isActive }) => isActive ? style.active : style.inActive} >
                <PersonIcon  /> Login
              </NavLink>
            }
          </Grid>
        </Grid>
      </Container>
    </header>
  );
};

export default Navbar;
