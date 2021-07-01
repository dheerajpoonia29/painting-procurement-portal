import "../css/homeScene.css";

import { useState } from "react";
import Card from "./Card";
import Form from "./Form";
import { paintingData } from "../assest/painting";

function renderAbout() {
  return (
    <div className="about">
      <img
        style={{ width: "100%" }}
        id="image"
        src="https://uploads.toptal.io/blog/image/125792/toptal-blog-image-1522395353253-70fb1c40e9527154c2774507b63eac63.png"
      />
    </div>
  );
}

function renderPainter() {
  // blockchain.getPainterPaintingsId(msg.sender)
  let myId = [0, 4, 7];
  return (
    <div className="painting">
      {paintingData.map((data, key) => {
        if (myId.indexOf(data.id) !== -1)
          return <Card data={data} action={"painter"} />;
      })}
    </div>
  );
}

function renderBidder() {
  return (
    <div className="painting">
      {paintingData.map((data, key) => {
        return <Card data={data} action={"bidder"} />;
      })}{" "}
    </div>
  );
}

function renderAddPainting() {
  return (
    <div className="form">
      <Form />
    </div>
  );
}

function HomeScene() {
  const [action, setAction] = useState("create");

  let inlineStyle = (current) => {
    if (action === current) {
      return {
        backgroundColor: "green",
      };
    } else {
      return {
        backgroundColor: "grey",
      };
    }
  };

  return (
    <div className="HomeSceneContainer">
      <div className="action" style={{ float: "left" }}>
        <button
          className="button"
          style={inlineStyle("about")}
          onClick={() => setAction("about")}
        >
          About
        </button>
        <button
          className="button"
          style={inlineStyle("painter")}
          onClick={() => setAction("painter")}
        >
          Painter
        </button>
        <button
          className="button"
          style={inlineStyle("bidder")}
          onClick={() => setAction("bidder")}
        >
          Bidder
        </button>
        <button
          className="button"
          style={inlineStyle("create")}
          onClick={() => setAction("create")}
        >
          Add Painting
        </button>
      </div>
      <div className="detail" style={{ float: "right" }}>
        {action === "about" && renderAbout()}
        {action === "painter" && renderPainter()}
        {action === "bidder" && renderBidder()}
        {action === "create" && renderAddPainting()}
      </div>
    </div>
  );
}

export default HomeScene;
