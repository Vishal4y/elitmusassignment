import { Button, Grid , Typography, Modal, Box, TextField} from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import getCookie from "../hooks/getCookie";
import setCookie from "../hooks/setCookie";
import removeCookie from "../hooks/removeCookie";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../Components/Assets/level1.json";
import { useState, useEffect, useRef } from "react";
import MultipleValueTextInput from 'react-multivalue-text-input';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const textfield = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  m: 1,
};


const buttons = { margin: "8px", backgroundColor: "#1D3557" };
const text = { padding: 2, margin: "3px 0" };

var modalText = "Mumma is still Angry with you !!";

const Homepage = () => {

  const navigate = useNavigate();
  const form = useRef();
  const [formitems, setItems] = useState([]);
  let answer = ["socks","laptop","book","nintendo","keys"];
  answer.sort();

  ////////////// Time Function
  const d = new Date();
  let time = d.getTime();
  let level3time= getCookie("level3");
  if(!level3time){
    let cookieState={
      startTime: time,
      endTime: 0
    }
    setCookie("level3", JSON.stringify(cookieState));
  }

  const [open, setOpen] = useState(false);
const [lastpage, setLastpage] = useState("/level3");
const [message, setMessage] = useState("Retry");
const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
const navigation = () => {
  if (lastpage === "/level3") {
    window.location.reload();
  } else {
    navigate(lastpage);
  }
};


   const checkComplete = (e)=>{
      e.preventDefault();
      console.log(formitems);
      let data= formitems;
      data.sort();
      let login = getCookie("login");
      
      if (login) {  
        let loginp= JSON.parse(login);
        /// calculate time
        const d = new Date();
        let time = d.getTime();
        let getstarttime=getCookie("level3");
        let getstarttimep=JSON.parse(getstarttime);
        let totalTime= time-getstarttimep.startTime;
        console.log(answer);
        console.log(data);
        if(JSON.stringify(answer) === JSON.stringify(data)){
          removeCookie("level3");
        let cookieStatetime={
          startTime: getstarttimep.startTime,
          endTime: time
        }
        setCookie("level3", JSON.stringify(cookieStatetime));
        console.log(totalTime);
        ///////
          const cookieState = {
              email: loginp.email,
              password: loginp.password,
              username: loginp.username,
              level: 4
            };
            removeCookie("login");
            setCookie("login", JSON.stringify(cookieState));
            axios.post("https://good-tan-wasp-slip.cyclic.app/api/game/level3", {email:loginp.email, complete: true, endtime:totalTime})
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log("Error");
            });
        console.log("Success");
        modalText="Congratulations !! Mumma is very Happy with you.";
        setMessage("Next Level");
        setLastpage("/level4");
        }
        else{
          axios.post("https://good-tan-wasp-slip.cyclic.app/api/game/level3", {email:loginp.email, complete: false, endtime:0})
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log("Error");
            });
        console.log("Try Again");
        modalText="Mumma is still Angry with you !!";
        setMessage("Try Again");
        }
        handleOpen();
      } 
      else {
          modalText="Login to Play";
          setMessage("Retry");
        console.log("Retry");
        window.location.reload();
        handleOpen();
      }
   }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    
  return (
    <div>
      <Navbar />
      <Grid container xs={12} sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor:"#000",
        
      }} >
       
       <Grid item sx={{

        p:5,
        borderRadius:"20px",
        border:"2px solid #F9A826",
        marginTop:"100px"
       }} >
       {/* <Lottie options={defaultOptions} height={350} width={800} /> */}
       <Grid item sx={{
         height: 400,
         width:1000
       }}>
       <img
            src="https://user-images.githubusercontent.com/82889656/232274381-de99434a-3e08-47a6-bdb6-235751312503.jpg"
            alt="image"
            height={400}
            width={1000}
       />
       </Grid>
       <Typography sx={{
          fontSize: "1.5rem",
          color:"#F9A826"
       }} >Mumma wants you to clean your Room. List down all things that are not in its place.</Typography>
       <Typography sx={{
          fontSize: "1rem",
          color:"#fff"
       }} >(Write each item as it is called and all in lowercase)</Typography>

      <form ref={form} onSubmit={checkComplete}>
      <MultipleValueTextInput
	      onItemAdded={(item, allItems) => {
          console.log(`Item added: ${item}`);
          setItems(allItems);
        }}
	      onItemDeleted={(item, allItems) => {
          console.log(`Item Deleted: ${item}`);
          setItems(allItems);
        }
        }
	      label="Items"
	      name="items"
	      placeholder="Enter Items"
      />
        <Button variant="contained" sx={{ marginTop: "1rem", marginBottom:"-2rem" }} type="submit">
        Next Level
        </Button>
      </form>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalText}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* <Link
                style={{ textDecoration: "None", color: "black" }}
                to={lastpage}
              > */}
            <Button
              onClick={navigation}
              style={buttons}
              variant="contained"
              color="primary"
            >
              {message}
            </Button>
            {/* </Link> */}
          </Typography>
        </Box>
      </Modal>
      </Grid>
   
    </div>
  );
};

export default Homepage;