import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { io } from "socket.io-client";
import { thousandsSeparators } from "../utils";
import { Players } from "./menuPlayers";

const socket = io("http://localhost:5000");

export const BetChart = ({ playerBet, highestValue }) => {
  const [_, setMessage] = useState("");
  const [defaultData, setDefaultData] = useState([0]);
  const [playerData, setPlayerData] = useState([]);
  const [option, setOption] = useState({});
  const [flattenedArray, setFlattenedArray] = useState([]);

  useEffect(() => {
    Players.map((player) => setDefaultData(player.betValue));
  }, [defaultData]);

  useEffect(() => {
    socket.on("Bet placed", (data) => {
      setMessage(data);
    });
    setPlayerData((playerData) => [...playerData, playerBet]);
    setFlattenedArray(playerData.flatMap((num) => num));
  }, [playerBet]);

  useEffect(() => {
    setOption({
      title: {
        text: "Day Trading Chart - Hourly",
      },
      tooltip: {
        trigger: "axis",
        padding: 5,
        borderRadius: 10,
        textStyle: {
          lineHeight: 0,
        },
        formatter: (params) => {
          params = params[0];
          return `<div class="text-center">
                    <p class="font-normal text-xs space-y-0.5 ">
                      Price - ${thousandsSeparators(params.value)}
                    </p>
                </div>`;
        },
      },
      axisLabel: {
        formatter: "{value}",
        color: "#",
        fontFamily: "Roboto",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        name: "Time in Hours",
        nameRotate: 0,
        nameGap: 30,
        nameLocation: "middle",
        axisTick: { show: true },
        axisLine: {
          show: true,
        },
        data: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "8",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },
      yAxis: {
        type: "value",
        name: "Random Values",
        nameLocation: "middle",
        axisTick: { show: true },
        boundaryGap: false,
        nameGap: 22,
        data: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
        axisLine: {
          show: true,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(174, 174, 174, 0.2)",
          },
        },
      },
      grid: {
        top: "15%",
        left: "5%",
        right: "1%",
        bottom: "15%",
        containLabel: true,
        show: true,
        backgroundColor: "#303036",
        borderColor: "rgb(128, 128, 128)",
        color: "#fffff",
        zlevel: "",
      },
      series: [
        {
          name: "Highest",
          type: "line",
          color: "#fc8452",
          data:
            playerBet === undefined || highestValue
              ? defaultData
              : flattenedArray,
          showSymbol: "price",
          symbol: "circle",
          symbolSize: 5,
          lineStyle: {
            color: "#51AF86",
          },
          encode: {
            x: "2022",
            y: "Random",
          },
          itemStyle: {
            color: "#51AF86",
          },
          smooth: true,
        },
      ],
    });
  }, [flattenedArray]);

  const onEvents = {
    click: () => console.log("chart clicked"),
    resize: () => console.log("chart resized"),
  };

  return (
    <div className="chart">
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "70%" }}
        onEvents={onEvents}
      />
    </div>
  );
};
