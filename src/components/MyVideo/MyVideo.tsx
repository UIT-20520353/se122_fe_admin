import React from "react";
import dummyVideo from "../../assets/images/vid.jpg";
import "./MyVideo.style.css";

interface IMyvideo {
  pageId: string;
}

const Myvideo: React.FunctionComponent<IMyvideo> = () => {
  return (
    <div className="MyvideoContainer">
      <img src={dummyVideo} alt="example" />
      <h5>Video title</h5>
    </div>
  );
};

export default Myvideo;
