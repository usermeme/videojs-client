import React from "react";
import { VideoTypes } from "./components/video/duck";
import { Video } from "./components";
import "./App.css";

const src = `${process.env.REACT_APP_URL}/2.P_13.4_ForceandMotionQC_1.m3u8`;

const transcriptons: VideoTypes.Transcription[] = [
  {
    id: "english",
    src: `${process.env.REACT_APP_URL}/force_and_motion_en.vtt`,
    label: "english",
  },
  {
    id: "spanish",
    src: `${process.env.REACT_APP_URL}/force_and_motion_spa.vtt`,
    label: "spanish",
  },
];
const App: React.FC = () => {
  return (
    <div className="App">
      <Video src={src} transcriptons={transcriptons} />
    </div>
  );
};

export default App;
