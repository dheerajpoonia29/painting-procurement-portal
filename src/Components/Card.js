import "../css/card.css";

import TimerCountDown from "./TimerCountdown";

function isBidOpen(date, time, role) {
  if (role === "bidder") {
    return false;
  }
  return true;
}

function getById(id) {
  console.log("id= =", id);
  return (
    <div>
      <h1>sdlfjsdlf {id}</h1>
    </div>
  );
}

function Card(props) {
  let painting = props.data;
  let role = props.action;

  return (
    <div className="card">
      <h4 className="title">{painting.name}</h4>
      <p>By {painting.artist}</p>
      <div className="image">
        <a onClick={() => getById(painting.id)}>
          <img src={painting.image} />
        </a>
      </div>
      <div className="info">
        {/* TODO: blockchain.getOwner(painting.id) */}

        <hr className="solid"></hr>
        <div>
          <p>Heigest Bid: {painting.heighest_bid}</p>
        </div>

        <hr className="solid"></hr>
        <div>
          <TimerCountDown bidDate={painting.date} bidTime={painting.time} />
        </div>
        
        <hr className="solid"></hr>
        <div>
          <input
            type="number"
            disabled={isBidOpen(painting.date, painting.time, role)}
          />
          <button
            type="button"
            disabled={isBidOpen(painting.date, painting.time, role)}
          >
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
