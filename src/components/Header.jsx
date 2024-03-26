import { AppBar, Container, MenuItem, Select, Toolbar, Typography,  createTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Crypto } from '../Context/CryptoContext';
import { useContext } from 'react';
import { ThemeProvider } from '@emotion/react';

const Header = () => {

  const { currency, setCurrency } = useContext(Crypto);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    },
  })


  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography variant='' onClick={() => { navigate("/") }} style={{
              flex: 1,
              color: "gold",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "pointer",
            }}>Crypto Explorer</Typography>
            <Select variant='outlined'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "black",
                backgroundColor: "white",
                fontWeight: "bold"
              }}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header