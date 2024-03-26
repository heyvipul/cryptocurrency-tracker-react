import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Crypto } from "../Context/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../components/Carousel";

const Coinpage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState();

  const { currency, symbol } = useContext(Crypto)

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [])

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>



  return (
    <div style={{display:"flex"}}>
      {/* sidebar */}
      <div style={{width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",}}>
        <img src={coin?.image.large} alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h4"
          style={{ fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>
        <div style={{alignSelf:"start",padding:25,paddingTop:10,width:"100%"}}>
          <span style={{display:"flex"}}>
          <Typography variant="h5"
          style={{ fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat" }}>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5"
          style={{fontFamily:"Montserrat"}}>
            {coin?.market_cap_rank}
          </Typography>
          </span>
          <span style={{display:"flex"}}>
          <Typography variant="h5"
          style={{ fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat" }}>
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5"
          style={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
          </span>
          <span style={{display:"flex"}}>
          <Typography variant="h5"
          style={{ fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat" }}>
            Market Cap:{" "}
          </Typography>
          &nbsp; &nbsp;
          <Typography variant="h5"
          style={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {
              numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))
            }
          </Typography>
          </span>
        </div>


      </div>


      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage