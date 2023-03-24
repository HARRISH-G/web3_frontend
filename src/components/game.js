import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Iframe from "react-iframe";
import Content from "./contet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import bbglogo from "../images/bbfulllogo.png";

const Game = () => {
  const [gamedetails, setgamedetails] = useState([]);
  // const params = useParams("");
  // console.log(params);
  let userdata = useSelector((state) => {
    console.log("home token", state);
    return state?.userToken?.state ? state?.userToken?.state : state?.userToken;
  });

  let gameId = useSelector((state) => {
    console.log("gameid state", state);
    return state?.GameiD?.gameId ? state?.GameiD?.gameId : state?.GameiD;
  });

  console.log("gameid", gameId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const fetchgamedetails = async () => {
    try {
      let gameid = { id: gameId };
      await axios({
        method: "get",
        url: "https://web3games-api.kryptofam.com/games/game_details",
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
        params: gameid,
      }).then((res) => {
        console.log(res);
        setgamedetails(res?.data?.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(gameId);
    fetchgamedetails();
  }, []);
  return (
    <div className="lg:ml-32 xl:py-4 md:py-2 sm:py-2 py-2 md:ml-32 sm:ml-32">
      <div className=" relative md:flex flex-col md:items-left md:justify-between px-10">
        {/* container */}
        <div className="lg:w-full text-left mt-5 sm:mt-5 md:mt-5 xl:mt-0">
          <div className="flex justify-between flex-row xl:flex-row md:flex-row sm:flex-row ">
            <div className="flex self-center m-2 align-middle">
              <img className="" height="150" width="150" src={bbglogo} />
            </div>

            <div className="flex xl:w-32 md:w-40 sm:w-32 w-32 flex-row header-search rounded-lg float-right bg-red-200">
              <div className="flex flex-col self-center ml-2">
                <span className="text-xs font-semibold text-slate-500">
                  Welcome
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {userdata.username}
                </span>
              </div>
              {/* <div className="flex flex-col self-center text-center"> */}
              {/* lg:ml-4 */}
              <img
                // src={profile}
                src={`https://ui-avatars.com/api/?bold=true&name=${userdata.username}`}
                height="40"
                width="40"
                className=" self-center rounded-full"
                // mr-2
                alt=""
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-10">
        {/* lg:ml-36 md:ml-36 sm:ml-36  */}
        <div className="unity-div">
          <div className="unity-container">
            {gamedetails && gamedetails.type === "online_play" ? (
              <Iframe
                src={"https://web3games-api.kryptofam.com/" + gamedetails.url}
                id=""
                height="600px"
                width="100%"
                className="w-full flex"
                allow="autoplay"
                display="block"
                position="relative"
              />
            ) : (
              <img
                src={
                  "https://web3games-api.kryptofam.com" +
                  "/public" +
                  gamedetails.thumbnail
                }
                // height="200px"
                className="mx-auto w-3/5 h-2/5 sm:mx-auto md:mx-0 lg:mx-0 xl:mx-0 rounded-lg self-center cursor-pointer"
                alt=""
              />
            )}

            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
