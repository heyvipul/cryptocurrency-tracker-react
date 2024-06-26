import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { Crypto } from '../Context/CryptoContext';
// import { ThemeProvider } from "@mui/styles";
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import { allcoinsArray } from '../config/allcoins';

const CoinsTable = () => {


  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate();
  const { currency, symbol } = useContext(Crypto)



  const fetchCoins = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
    } catch (error) {
      setCoins(allcoinsArray)
      setLoading(false);
    }
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


  return (
    <ThemeProvider theme={darkTheme} >
      <Container style={{ textAlign: "center", backgroundColor: "rgb(20,22,26)" }}>
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
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }}
                      align={head === "Coin" ? "" : "right"}
                      key={head}>
                      {head}
                    </TableCell>
                  ))}
                </TableHead>

                <TableBody>
                  {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        style={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                          fontFamily: "Montserrat",
                        }}
                        key={row.name}>
                        <TableCell component="th"
                          scope='row'
                          style={{
                            display: "flex",
                            gap: 15, alignItems: "center"
                          }}>
                          <img src={row?.image} alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ textTransform: "uppercase", fontSize: "22", color: "white" }}>{row.symbol}</span>
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: "white" }} align='right'>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell align='right'
                          style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          style={{ color: "white" }}
                          align='right'>
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
        <Pagination
          className="pagination-white-text"
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        {/* <Pagination style={{color :"gold",backgroundColor : "white"}}
        count={10} /> */}


      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable