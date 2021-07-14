// import "../css/form.css";
import "../css/helio.css";

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
      painter: "",
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
      <div className="row">
        <form>
        <h3>Register your new painting</h3>
          <label for="painter">
            <span>
              Address <span style={{color: "red"}}>*</span>
            </span>
            <input
              type="text"
              className="input-field"
              name="painter"
              value={this.state.painter}
              onChange={this.handleChange}
              placeholder="Your metmask address"
            />
          </label>
          <label for="name">
            <span>
              Painting Name <span className="required">*</span>
            </span>
            <input
              type="text"
              className="input-field"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Your painting name"
            />
          </label>
          <label for="artist">
            <span>
              Artist Name <span className="required">*</span>
            </span>
            <input
              type="text"
              className="input-field"
              name="artist"
              value={this.state.artist}
              onChange={this.handleChange}
              placeholder="Your name"
            />
          </label>
          <label for="image">
            <span>
              Painting Url <span className="required">*</span>
            </span>
            <input
              type="text"
              className="input-field"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
              placeholder="Your image url"
            />
          </label>
          <label for="date">
            <span>
              Bid Date <span className="required">*</span>
            </span>
            <DatePicker
              onChange={(dp) => this.setState({ date: dp })}
              value={this.state.date}
            />
          </label>
          <label for="time">
            <span>
              Start Time <span className="required">*</span>
            </span>
            <TimeRangePicker
              onChange={(tp) => this.setState({ time: tp })}
              value={this.state.time}
            />
          </label>

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
        </form>
      </div>
    );
  }
}

export default Form;
