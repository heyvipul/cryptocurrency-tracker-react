import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import banner from "../../public/banner2.jpg"

const useStyles = makeStyles(()=>({
    banner : {
        backgroundImage : "url(./banner2.jpg)"
    },
    bannerContent : {
        height : 400,
        display : "flex",
        flexDirection : "column",
        paddingTop : 25,
        justifyContent : "space-around"
    },
    tagline :{
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        textAlign : "center",
        height : "40%"
    }
}))

const Banner = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant="h2"
                style={{
                    fontWeight : "bold",
                    marginBottom : 15,
                    fontFamily : "Montserrat"
                }}>
                    Crypto Explorer
                </Typography>
                <Typography variant="subtitle2" style={{
                    color : "darkgray",
                    textTransform : "capitalize",
                    fontFamily : "Montserrat"
                }}>
                    Get all the Info regarding your favourite crypto currency!
                </Typography>
            </div>
        </Container>
    </div>
  )
}

export default Banner