import style from "./style.module.css";
import CircularProgress from '@mui/material/CircularProgress';



const PageLoader:React.FC = () => {
    return(
        <div className={style.loader__main}>
          <h2>Loading &nbsp;&nbsp;&nbsp;  <CircularProgress size="40px" />  </h2>
        </div>
    )
}


export default PageLoader;