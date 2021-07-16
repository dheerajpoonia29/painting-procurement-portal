import "../css/form.css";
import { Component } from "react";
import DatePicker from "react-date-picker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import ApiClient from "../ApiManager";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      artist: "",
      painter: this.props.account,
      image: "",
      date: "",
      time: "",
      heighest_bid: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    let params = {
      name: this.state.name,
      artist: this.state.artist,
      painter: this.state.painter,
      image: this.state.image,
      date: this.state.date.toString(),
      time: this.state.time.join(","),
      heighest_bid: this.state.heighest_bid,
      is_bid_closed: "false",
    };
    // TODO: blockchain.registerPainting(res.data.id, this.state.painter)
    ApiClient.paintingCreateNew(params)
      .then((res) => {
        res.data.msg && res.data.id
          ? this.savePaintingToPainter(res)
          : alert(`Data base error !\ndb_res = ${res}`);
      })
      .catch((err) => alert(`Api error, ${err.code}`));
  }

  savePaintingToPainter(res) {
    alert(`${res.data.msg}\nPainting ID =${res.data.id}`);
    let params = {
      address: this.state.painter,
      painting_id: `${res.data.id}`,
    };
    ApiClient.painterCreateNew(params)
      .then((res) =>
        res.data.msg && res.data.id
          ? alert(`${res.data.msg}\nPainter ID =${res.data.id}`)
          : alert(`Blockchain error !\nres = ${res}`)
      )
      .catch((err) => alert(`Api error, ${err.code}`));
  }

  render() {
    return (
      <div className="row uniform">
        <div className="12u 12u$(xsmall)">
        {/* <form> */}
        <h3 className="form-heading">Register your new painting</h3>
          {/* Painter address  */}
          <label for="painter">
              Address <span style={{color: "red"}}>*</span>
          </label>
          <input
              type="text"
              className="input-field"
              style={{marginRight: '0px', width: '70%', marginBottom: '15px'}}
              name="painter"
              value={this.state.painter}
              onChange={this.handleChange}
              placeholder="Your metmask address"
            />
            {/* Painting name */}
          <label for="name">
            <span>
              Painting Name <span style={{color: "red"}}>*</span>
            </span>
          </label>
          <input
              type="text"
              className="input-field"
              style={{marginRight: '0px', width: '70%', marginBottom: '15px'}}
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Your painting name"
          />
          {/* Painting artist */}
          <label for="artist">
              Artist Name <span style={{color: "red"}}>*</span>
          </label>
          <input
              type="text"
              className="input-field"
              style={{marginRight: '0px', width: '70%', marginBottom: '15px'}}
              name="artist"
              value={this.state.artist}
              onChange={this.handleChange}
              placeholder="Your name"
            />
          {/* Painting Url */}
          <label for="image">
            <span>
              Painting Url <span style={{color: "red"}}>*</span>
            </span>
          </label>
          <input
              type="text"
              className="input-field"
              style={{marginRight: '0px', width: '70%', marginBottom: '15px'}}
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
              placeholder="Your image url"
            />
          <label for="date">
            <span>
              Bid Date <span style={{color: "red"}}>*</span>
            </span>
          </label>
          <div id="date">
            <DatePicker
                onChange={(dp) => this.setState({ date: dp })}
                value={this.state.date}
            />
          </div>
          <label for="time">
            <span>
              Start Time <span style={{color: "red"}}>*</span>
            </span>
          </label>
          <div id="time">
            <TimeRangePicker
                id="time"
                style={{display: 'none'}}
                onChange={(tp) => this.setState({ time: tp })}
                value={this.state.time}
            />
          </div>

          <label>
            <span> </span>
            <input
              className="button special"
              style={{marginTop: "40px"}}
              type="submit"
              onClick={() => this.handleSubmit()}
              value="Submit"
            />
          </label>
        {/* </form> */}
        </div>
      </div>
    );
  }
}

export default Form;
