import React from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import Score from "../Components/score";
import { useEffect, useState } from "react";
import axios from "axios";


const ScoreBoard = () => {
  const location = useLocation();
  console.log('Email', location.state.email);
  const email=location.state.email;

  // const [data, setData]= useState({});

  // const getData = async ()=>{
  //   await axios.post("https://good-tan-wasp-slip.cyclic.app/api/game/scoreboard", {email:email})
  //             .then((response) => {
  //               console.log(response);
  //               setData(response.data.allData);
  //             })
  //             .catch((error) => {
  //               console.log("Error");
  //             });
  // }
  // useEffect(() => {
  //   getData();
  // },data);
  // console.log(data);


  return (
    <div>
      <Navbar />
     <Score email={email} />

    </div>
  );
};

export default ScoreBoard;
