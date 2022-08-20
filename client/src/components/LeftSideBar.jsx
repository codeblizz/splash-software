import React, { useState, useEffect } from "react";
import { Players } from "./menuPlayers";
import { ToastContainer, toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { isEmpty } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const socket = socketIOClient("http://localhost:5000");

const LeftSideBar = ({ playerBet, setPlayerBet, setHighestValue }) => {
  const [, setMessage] = useState("");
  const [, setIndex] = useState(0);
  const toastId = React.useRef(null);

  const dismiss = () => toast.dismiss(toastId.current);

  const onClick = async (e, players) => {
    dismiss();
    const { playerName, id } = players;
    setIndex((prevState) => prevState + id);
    socket.emit("player_name", `${playerName}`);

    socket.on("server_message", (msg) => {
      console.log("message from server", msg);
      setMessage(msg);
    });

    socket.emit("Api request", "msg");
    socket.on("Api response", (data) => {
      if (data >= 100) {
        setHighestValue(true);
        toast.info(`Trade ended, profit target reached 100 🚀`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        dismiss();
      } 
      if(data < 100) {
        setPlayerBet([data]);
      }
    });
  };

  return (
    <div>
      <ToastContainer limit={1} />
      <ul className="side-bar">
        {Players.map((players) => {
          return (
            <li key={players.id}>
              <div className="menu-space" onClick={(e) => onClick(e, players)}>
                <span className="player-icon">{players.playerIcon} </span>
                <div className="menu-items">
                  <span className="">{players.playerName}</span>
                  {!isEmpty(playerBet) ? (
                    playerBet.map((bet, i) => {
                      return (
                        <span key={i}>
                          {parseFloat(bet / players.id).toFixed(2)}
                        </span>
                      );
                    })
                  ) : (
                    <span>{players.betValue}</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideBar;
