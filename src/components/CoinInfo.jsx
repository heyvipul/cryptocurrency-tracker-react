import React, { useContext, useEffect, useState } from 'react'
import { Crypto } from '../Context/CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
ChartJS.register(LineElement, PointElement, LinearScale, Title);

const CoinInfo = ({ coin }) => {

  const [historicaldata, setHistoricalData] = useState()
  const [days, setDays] = useState(1);

  const { currency, symbol } = useContext(Crypto)

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  console.log(historicaldata);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    }
  })


  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 25,
        padding: 40
      }}>
        {
          !historicaldata ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (<>
            <Line
              datasetIdKey='id'
              data={{
                labels: historicaldata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicaldata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements:{
                  point : {
                    radius : 1,
                  }
                }
              }}
            />
            <div style={{
              display :"flex",
              marginTop : 20,
              justifyContent:"space-around",
              width : "100%"
            }}>
              {chartDays.map((day,index) =>(
                 <SelectButton
                 className= "chart-button"
                 value={day.value}
                 onClick={()=>setDays(day.value)} 
                 selected={day.value === days}
                 key={index}>{day.label}</SelectButton>
              ))}
            </div>
          </>)
        }

        {/* buttons */}
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo