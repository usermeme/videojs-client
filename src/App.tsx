import React from "react";
import { Video } from "./components";
import "./App.css";

const src = `${process.env.REACT_APP_URL}/2.P_13.4_ForceandMotionQC_1.m3u8`;

const App: React.FC = () => {
  return (
    <div className="App">
      <Video src={src} />
    </div>
  );
};

export default App;
