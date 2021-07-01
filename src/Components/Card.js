import "../css/card.css";

function isBidOpen(date, sTime, eTime, role){
  console.log('ctx = ', date, sTime, eTime, role)
  if(role==='bidder'){
    return false;
  }
  return true;
}

function Card(props) {
  let painting = props.data;
  let role = props.action;

  return (
    <div className="card">
      <div className="image">
        <img src={painting.image} />
      </div>
      <div className="info">
        {/* Image Detail */}
        <hr class="solid"></hr>
        <h4 className="title">{painting.name}</h4>
        <p>By {painting.artist}</p>
        {/* <p>Onwer {blockchain.getOwner(painting.id}</p> */}

        {/* Painting Detail */}
        <hr class="solid"></hr>
        <p>Expire: {painting.bid.expire ? "Closed" : "Open"}</p>
        <p>
          StartTime:{painting.bid.start_time}, endTime:{painting.bid.end_time}
        </p>
        <p>Heigest Bid: {painting.bid.heighest_bid}</p>

        <hr class="solid"></hr>
        <input type="number" disabled={isBidOpen(painting.bid.date, painting.bid.start_time, painting.bid.end_time, role)} />
        <button type="button" disabled={isBidOpen(painting.bid.date, painting.bid.start_time, painting.bid.end_time, role)}>
          Place Bid
        </button>
      </div>
    </div>
  );
}

export default Card;
