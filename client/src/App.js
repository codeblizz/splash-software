import { BetChart } from "./components/BetChart";
import React, { useState } from "react";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar";
import Header from "./components/atom/Header";
import Paragraph from "./components/atom/Paragraph";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [playerBet, setPlayerBet] = useState([0]);
  const [highestValue, setHighestValue] = useState(false);

  return (
      <div className="App">
        <Header>
          <Paragraph text="Trading Software" />
        </Header>
        <div className="main">
          <LeftSideBar
            playerBet={playerBet}
            setPlayerBet={setPlayerBet}
            setHighestValue={setHighestValue}
          />
          <BetChart
            playerBet={playerBet}
            setHighestValue={setHighestValue}
            highestValue={highestValue}
          />
        </div>
      </div>
  );
}

export default App;
