import "../css/header.css";

function Header() {
  return (
    <div className="headerContainer">
      <div style={{ float: "left" }}>
        <h1 className="logoTitle">Painting Procurement</h1>
      </div>
      <div style={{ float: "right" }}>
        <h1 className="accInfo">0x000000000000000000000000000 | <span style={{
  border: "2px dashed #f69c55"}}>100 Eth</span> </h1>
      </div>
    </div>
  );
}

export default Header;
