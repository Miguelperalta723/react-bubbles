import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    resetData()
  }, [])

  const resetData = () => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
      setColorList(res.data)
    })
  }
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} resetData={resetData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
