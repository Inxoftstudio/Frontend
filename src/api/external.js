import axios from "axios";

import { NEWS_API_KEYS } from "../utils";


// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEYS}`;

const NEWS_API_ENDPOINT = `https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`


const CRYPTO_API_ENDPOINT = `https://data.binance.com/api/v3/ticker/24hr`

export const GetNewsApi = async () => {
    let response;
    try {
      response = await axios.get(NEWS_API_ENDPOINT);
      response = response.data.articles.slice(0, 12);
    } catch (error) {
      console.log(error, "error in GetNewApi Function")
    }
  
    return response;
};


export const GetCryptoApi = async () => {
  let response;
  try {
    response = await axios.get(CRYPTO_API_ENDPOINT);
    response = response.data.slice(0, 12);
  } catch (error) {
    console.log(error, "error in GetCryptoApi Function")
  }
  return response;
};