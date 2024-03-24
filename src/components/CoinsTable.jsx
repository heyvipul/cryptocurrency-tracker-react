import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { Crypto } from '../Context/CryptoContext';
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const CoinsTable = () => {


  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search,setSearch] = useState("")
  const navigate = useNavigate();
  const { currency, symbol } = useContext(Crypto)



  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins();
  }, [currency])

  console.log(coins);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    },
  })

  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    )
  }

  const useStyles = makeStyles(() =>({
    
  }))

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center",backgroundColor:"rgb(20,22,26)"}}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          variant='outlined'
          style={{ marginBottom: 20, width: "100%", border: "1px solid white", color: "white" }}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
          onChange={(e) => setSearch(e.target.value)}
          label="Search for a Crypto Currency.." />
          <TableContainer>
            {
              loading ? (
                <LinearProgress style={{backgroundColor :"gold"}} />
              ) : (
                <Table>
                  <TableHead style={{backgroundColor:"#EEBC1D"}}>
                    {["Coin","Price","24h Change","Market Cap"].map((head) =>(
                      <TableCell 
                      style={{color:"black",fontWeight:"700",fontFamily:"Montserrat"}}
                      align={head === "Coin" ? "" : "right"}
                      key={head}>
                      {head}
                      </TableCell>
                    ))}
                  </TableHead>

                  <TableBody>
                      {handleSearch().map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        return (
                          <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}>
                            <TableCell component="th"
                            scope='row'
                            style={{display:"flex",
                            gap:15, alignItems :"center"}}>
                            <img src={row?.image} alt={row.name}
                            height="50" 
                            style={{marginBottom:10}}  
                            />
                            <div style={{display :"flex",flexDirection:"column"}}>
                              <span style={{textTransform:"uppercase",fontSize:"22",color :"white"}}>{row.symbol}</span>
                              <span style={{color :"darkgrey"}}>{row.name}</span>
                            </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              )
            }
          </TableContainer>

      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable