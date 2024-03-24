import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { Crypto } from '../Context/CryptoContext';
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Container, Typography, createTheme } from '@mui/material';

const CoinsTable = () => {

    
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const {currency,symbol} = useContext(Crypto)

  

    const fetchCoins = async () =>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    useEffect(()=>{
        fetchCoins();
    },[currency])

    console.log(coins);

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff"
          },
          type: "dark"
        },
      })

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign :"center"}}>
            <Typography 
            variant='h4'
            style={{margin :18,fontFamily :"Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable