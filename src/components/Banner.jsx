import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
// import banner from "../../public/banner2.jpg"

const Banner = () => {

    return (
        <div style={{ backgroundImage: "url(./banner2.jpg)" }}>
            <Container style={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                paddingTop: 25,
                justifyContent: "space-around"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "40%"
                }}>
                    <Typography variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}>
                        Crypto Explorer
                    </Typography>
                    <Typography variant="subtitle2" style={{
                        color: "darkgray",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat"
                    }}>
                        Get all the Info regarding your favourite crypto currency!
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner