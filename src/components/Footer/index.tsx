import { Container, Grid } from "@mui/material";
import style from "./style.module.css"

const Footer: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12}>
                    <footer className={style.footer__line}>
                      <p>Copyright © 2023 Coinbase | All rights reserved.   </p>
                    </footer>
                </Grid>
            </Grid>
        </Container>
    )

}


export default Footer;