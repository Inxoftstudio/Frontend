import Layout from "../../layout/index"
import { useState, useEffect } from "react"
import { PageTitle } from "../../utils";
import { GetCryptoApi } from "../../api/external";
import { Container, Grid } from "@mui/material";
import style from "./style.module.css";
import { PageLoader } from "../../components";



// Define the crypto interface to match the structure of your cryptos
interface CrypotoCurrency {
  market_cap_rank: string;
  current_price: string;
  id: string;
  image: string;
  name: string;
  symbol: string;
  lastPrice: number;
  priceChange: number;

  // Add other properties of an crypto if necessary
}


const CryptoCurrency: React.FC = () => {

  const [crypto, setCrypto] = useState<CrypotoCurrency[]>([]);

  useEffect(() => {
    (async function newsApiCalling() {
      try {
        const response: any = await GetCryptoApi();
        setCrypto(response);
      } catch (error) {
        console.log(error, "Error fetching cryptos:")
      }
    })();

    return () => {
      setCrypto([]);
    };
  }, [])


  if (crypto.length === 0) {
    return (
    <Layout>
       <PageLoader />
    </Layout>
    )
  }


  const negativeStyle = {
    color: "#ea3943",
  };

  const positiveStyle = {
    color: "#16c784",
  };

  return (
    <Layout>
      <PageTitle title="CryptoCurrency - Coinbase" />
      <section>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} p={2}>
              <table>
                <thead>
                  <tr className={style.head}>
                    <th>#</th>
                    <th>Symbol</th>
                    <th> Price</th>
                    <th>Last 24h Price</th>
                  </tr>
                </thead>
                <tbody>
                  {crypto.map((coin,ind) => (
                    <tr key={ind}  className={style.tableRow}>
                      <td>{ind}</td>
                      <td>
                        <div className={style.symbol}>{coin.symbol}</div>
                      </td>
                      <td>{coin.priceChange}</td>
                      <td style={coin.lastPrice <= 0 ? negativeStyle : positiveStyle}>
                        {coin.lastPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  )
}

export default CryptoCurrency;