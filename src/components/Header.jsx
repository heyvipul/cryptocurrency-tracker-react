import { AppBar, Container, MenuItem, Select, Toolbar, Typography, createTheme } from '@mui/material';
import { makeStyles, ThemeProvider } from "@mui/styles";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    }
  }))

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    },
  })

  const classess = useStyles();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography variant='' onClick={() => { navigate("/") }} className={classess.title}>Crypto Explorer</Typography>
            <Select variant='outlined' style={{
              width: 100,
              height: 40,
              marginRight: 15,
              color : "black",
              backgroundColor : "white",
              fontWeight  : "bold"
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