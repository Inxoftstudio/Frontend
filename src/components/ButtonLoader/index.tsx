import CircularProgress from '@mui/material/CircularProgress';
import style from "./style.module.css"

//  Custom Loader Function 
const SpinnerLoader:React.FC = () => {
    return(
        <div className={style.loader__main}>
            <CircularProgress size="20px" />
        </div>
    )
}


export default SpinnerLoader;