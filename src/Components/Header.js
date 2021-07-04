import "../css/header.css";

function Header() {
  return (
    <div className="headerContainer">
      <div style={{ float: "left" }}>
        <h1 className="logoTitle">Painting Procurement</h1>
      </div>
      <div style={{ float: "right" }}>
        <h1 className="accInfo">0xacfd43979764864ef2d89a2ae15c2afa24a4f099 | <span style={{
  border: "2px dashed #f69c55"}}>100 Eth</span> </h1>
      </div>
    </div>
  );
}

export default Header;
