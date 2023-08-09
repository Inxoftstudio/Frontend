import { Link } from "react-router-dom";
import style from "./style.module.css";
import { PageTitle } from "../../utils";
const Error:React.FC = () => {

  return (
      <section className={style.Error__page}>
        <PageTitle title="My Awesome App" />
        <h1>Error 404 Page is not available or The webpage at might be temporarily down </h1>
        <Link to="/">Go to Home page</Link>
      </section>
  )
}

export default Error