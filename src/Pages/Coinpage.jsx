import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Crypto } from "../Context/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { Typography } from "@mui/material";
// import parse from 'html-react-parser';

const Coinpage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState();

  const { currency, symbol } = useContext(Crypto)

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  // console.log(coin.description.en);

  useEffect(() => {
    fetchCoin();
  }, [])



  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      // [theme.breakpoints.down("md")]: {
      //   flexDirection: "column",
      //   alignItems: "center",
      // },
    },
    sidebar: {
      width: "30%",
      // [theme.breakpoints.down("md")]: {
      //   width: "100%",
      // },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },

  }));

  const classes = useStyles();


  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img src={coin?.image.large} alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h4"
          style={{ fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>

        {/* <Typography variant="subtitle1">
          {parse(coin?.description.en.split('\n').slice(0, 3).join('\n'))}.
        </Typography> */}

      </div>


      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage