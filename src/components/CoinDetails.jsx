import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import {
  CircularProgress,
  ThemeProvider,
  createTheme,

} from "@mui/material";


import {chartDays} from "../config/data.js"
import { Crypto } from "../Context/CryptoContext";
import { HistoricalChart } from "../config/api.js";
import SelectButton from "./SelectButton.jsx";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function CoinsDetails({ coin }) {


  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(Crypto)
  const [flag, setflag] = useState(false);


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  console.log(days);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='conatianerDetails'>
        {!historicData || flag === false ? (
          <CircularProgress style={{ color: "red" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "green",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays?.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinsDetails;