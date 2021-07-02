import "../css/card.css";

import TimerCountDown from "./TimerCountdown";

function Card(props) {
  let painting = props.data;

  return (
    <div className="card">
      <h4 className="title">{painting.name} {painting.id}</h4>
      <p>By {painting.artist}</p>
      <div className="image">
        <a href="#">
          <img src={painting.image} />
        </a>
      </div>
      <div className="info">
        {/* TODO: blockchain.getOwner(painting.id) */}
        <hr className="solid"></hr>
        <div className="address">
          <p>Painter: {painting.painter}</p>
          <p>Bidder: {painting.bidder}</p>
        </div>


        <hr className="solid"></hr>
        <div>
          <p>Heigest Bid: {painting.heighest_bid}</p>
        </div>

        <hr className="solid"></hr>
        <div>
          <TimerCountDown bidDate={painting.date} paintingId={painting.id} bidTime={painting.time} role={props.action}/>
        </div>
      </div>
    </div>
  );
}

export default Card;
