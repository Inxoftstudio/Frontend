import Layout from "../../layout/index"
import { useState, useEffect } from "react"
import { PageTitle } from "../../utils";
import { GetNewsApi } from "../../api/external";
import { Container, Grid, Box } from "@mui/material";
import style from "./style.module.css";
import { PageLoader } from "../../components";



// Define the Article interface to match the structure of your articles
interface Article {
  title: string;
  urlToImage: string | null;
  author: string;
  url : string;
  // Add other properties of an article if necessary
}


const Home: React.FC = () => {

  const [articles, setArticles] = useState<Article[]>([]);



  useEffect(() => {
    (async function newsApiCalling() {
      const response: any = await GetNewsApi();
      setArticles(response);
    })();

    return () => {
      setArticles([]);
    };
  }, [])


  const handleClick = (url: string) =>(
    window.open(url, "_blank")
  )



  if (articles.length === 0){
    return (
    <Layout>
      <PageLoader />
    </Layout>
    )
  }

  return (
    <Layout>
      <PageTitle title="New Articles - Coinbase" />
      <section>
        <h1 className={style.heading_one}>New Articles </h1>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {articles.map((article, ind) => {
              if (article.urlToImage != null) {
                return (
                  <Grid key={ind} item xs={12} sm={12} md={6} lg={4} p={2}>
                    <Box className={style.article__Box} onClick={() => handleClick(article.url)}>
                      <img src={article.urlToImage} alt={article.author} />
                      <h4>{article.title}</h4>
                    </Box>
                  </Grid>
                );
              } else {
                return null; // If urlToImage is null, skip rendering this article
              }
            })}
          </Grid>
        </Container>
      </section>
    </Layout>
  )
}

export default Home