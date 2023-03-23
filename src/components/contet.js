import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import profile from "../images/profile.png";

import uparrow from "../images/uparrow.png";
import { Accordion } from "react-bootstrap-accordion";
import Iframe from "react-iframe";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { COMMENTS } from "../actiontypes/Types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Content = () => {
  const [gamecomments, setgamecomments] = useState([]);
  const [info, setinfo] = useState([]);
  const [isClick, setClick] = useState(false);
  const [comment, setcomment] = useState("");
  // const params = useParams("");

  let dispatch = useDispatch();
  let userdata = useSelector((state) => {
    console.log("home token", state);
    return state?.userToken?.state ? state?.userToken?.state : state?.userToken;
  });

  let gameId = useSelector((state) => {
    console.log("gameid state", state);
    return state?.GameiD?.gameId ? state?.GameiD?.gameId : state?.GameiD;
  });

  let token = sessionStorage.getItem("token");

  const savecomment = async () => {
    setcomment("");
    try {
      console.log(comment);
      let data = {
        comment: comment,
      };
      await axios({
        method: "post",
        url: `https://web3games-api.kryptofam.com/add_comments?id=${gameId}`,
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
        data: data,
      }).then((res) => {
        console.log("comment added", res);
        if (res?.data?.code === 200) {
          setgamecomments(res?.data?.data?.comments);
        }
      });
    } catch (err) {
      console.log("ertr", err);
      setcomment("");
    }
  };

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
        console.log("comments deta", res);
        setinfo(res?.data?.data);
        setgamecomments(res?.data?.data?.comments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleChange = (event) => {
  //   console.log(event.target.checked);
  // };

  const handleChange = async (event) => {
    console.log("like ", event.target.checked);
    let isfav = event.target.checked;
    try {
      // if (event.target.checked) {
      let data = {
        game_id: gameId,
        is_favorite: isfav,
      };
      await axios({
        method: "post",
        url: "https://web3games-api.kryptofam.com/users/update_favorite_game",
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
        data: data,
      }).then((res) => {
        console.log("fav added", res);
        fetchgamedetails();
      });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchgamedetails();
  }, []);

  return (
    <div className="flex flex-col xl:p-0 md:p-0 sm:p-2 p-2">
      {/* <div className="flex text-red-500 text-lg float-left text-left  font-semibold py-5">
        <span className="border-b-2 border-red-500">More Information</span>
        <i class="fa fa-angle-down text-xl font-semibold self-center align-middle text-red-500"></i>
      </div> */}

      <div className="flex justify-between sm:justify-between md:justify-between xl:justify-between">
       <div className="justify-start flex">
        {info && info.type === "download" && (
          <div className="self-center justify-start sm:justify-start flex flex-col align-middle download-link">
            <a className="text-md font-semibold" href={"https://web3games-api.kryptofam.com" + info.url}>
              {info && info?.name}
              <span>
                <i class="fa fa-download mx-2" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        )}
        </div>

<div className="flex self-end  float-rightsm:justify-end justify-end md:justify-end lg:justify-end xl:justify-end">
        <div
          style={{
            margin: "auto",
            display: "block",
            width: "fit-content",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onChange={handleChange}
                checked={info.isFavorite === true ? true : false}
                name="checkedH"
              />
            }
            label={info.isFavorite === true ? "Favourite" : "Add To Favourite"}
          />
        </div>
      </div>
      </div>
     
      {/* <div>
        <Accordion
          id="first"
          title="More Information"
          className="flex float-left text-left flex-col accordion-image first"
        >
          <div className="body-height flex h-auto close-accordion">
            <div className="flex h-auto">{info.description}</div>
          </div>
        </Accordion>
      </div> */}

       {/* onClick={getclick}  */}
      <div className="flex flex-row self-center text-center py-5 align">
        <input
          type="text"
          name="search"
          value={comment}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          className="header-search bg-red-200 
         b-2 px-3 p-4 h-full dark:focus:border-red-300 focus:ring-red-300 focus:border-red-300 border-0
      border-red-300 placeholder-white font-semibold focus:outline-none 
      xl:w-96 md:w-96 sm:w-full w-full block text-white  rounded-full sm:text-sm focus:ring"
          placeholder="Type Comments...."
        />

        <button
          type="button"
          onClick={savecomment}
          className="bg-red-500 xl:w-60 md:w-60 sm:w-40 w-40 text-white font-semibold -ml-20  xl:px-12 md:px-6 sm:px-6 px-6 text-xs rounded-full "
        >
          Send Comment
        </button>
      </div>
      <div className="flex w-full flex-col h-96 overflow-y-auto scroll">
        {gamecomments
          .slice()
          .reverse()
          .map((comment) => {
            return (
              <div
                className="flex flex-col py-3 text-left float-left"
                key={comment._id}
              >
                <div className="flex flex-row w-full">
                  <img
                    // src={profile}
                    src={`https://ui-avatars.com/api/?bold=true&name=${comment.username}`}
                    height="40"
                    width="40"
                    className="mr-2 self-center rounded-full"
                    alt=""
                  />
                  <span className="flex self-center text-sm font-normal">
                    {comment.username}
                  </span>
                </div>
                <div>{comment.text}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Content;
