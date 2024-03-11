import { makeStyles } from "@mui/styles";
import axios from "axios"
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from "../config/api";
import { useContext, useEffect, useState } from "react";
import { Crypto } from "../Context/CryptoContext";
import { Link } from "react-router-dom";
import array from "../config/mock";


const useStyles = makeStyles(()=>({
    carousel : {
        height : "50%",
        display : "flex",
        alignItems : "center",
    },
    carouselItems : {
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        cursor : "pointer",
        textTransform : "uppercase",
        color : "white",
    }
}))


const Carousel = () => {
    
    const classes = useStyles();
    const [trending,setTrending] = useState(array);
    const {currency,symbol} = useContext(Crypto)

    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }
    
    const fetchTrendingCoins = async () =>{
        try {
            const {data} = await axios.get(TrendingCoins(currency));
            console.log(data);
            setTrending(data) 

        } catch (error) {
            console.log({message: "api req failed",error});
        }
        // ;
    }

    const responsive = {
        0 : {
            items : 2,
        },
        512 : {
            items : 4,
        }
    }
    
    console.log(trending);

    
    const items = trending?.map((coin) =>{
        let profit = coin?.price_change_percentage_24h >= 0;

        return <Link className={classes.carouselItems} key={coin.id}>
            <img src={coin?.image} 
            alt={coin?.name}
            height="80"
            style={{marginBottom : 10}} />
            <span>{coin?.symbol}
            &nbsp;
            <span>{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
            </span>
            <span style={{fontSize : 22, fontWeight : 500}}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
    })


    useEffect(()=>{
        fetchTrendingCoins();
    },[currency])

  return (
    <div className={classes.carousel}>
       <AliceCarousel 
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls 
        disableDotsControls
        responsive={responsive}
        items={items}
       />
    </div>
  )
}

export default Carousel