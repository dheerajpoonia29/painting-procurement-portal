import "../css/card.css";

import Bidding from "./Bidding";

function Card(props) {
  let painting = props.data;

  return (
    <div className="card">
      <h4 className="title">{painting.name} - {painting.id}</h4>
      <p>By {painting.artist}</p>
      <div className="image">
        <a href="#">
          <img src={painting.image} />
        </a>
      </div>
      <div className="info">
        {/* TODO: blockchain.getOwner(painting.id) */}
        

        <div>
          <Bidding painter={painting.painter} bidder={painting.bidder} heighestBid={painting.heighest_bid} bidClosed={painting.is_bid_closed} bidDate={painting.date} paintingId={painting.id} bidTime={painting.time} account={props.account} role={props.action}/>
        </div>
      </div>
    </div>
  );
}

export default Card;
