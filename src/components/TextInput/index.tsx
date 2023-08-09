import style from "./style.module.css";

const TextInput:React.FC = (props:any) => {
  return (
    <div className={style.input__boxess}>
        <input  {...props} />
        { props.error && ( <p>{props.errormessage}</p> ) }
    </div>
  );
}


export default  TextInput;
