import React from "react";
import Serch from "./Main/Search";
import s from "./App.module.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      load: false,
      inputValue: " ",
    };
  }

  request = (e) => {
    if (e.key === "Enter") {
      try {
        let inputVal = this.state.inputValue;
        let cutVal = inputVal.trim();
        if (cutVal !== "") {
          const api = "16231cb764f891b525cd2b445ebfb729";
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}`;
          fetch(url, {
            origin: "cors",
          })
            .then((resp) => resp.json())
            .then((data) =>
              this.setState({
                data: data,
                load: true,
                inputVal: "",
              })
            );
        } else {
          alert("Enter your town!");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  addWeatherToPage = () => {
    if (this.state.load === true) {
      let city = this.state.data.name;
      let region = this.state.data.sys.country;
      let temp = this.KtoC(this.state.data.main.temp);
      let minTemp = this.KtoC(this.state.data.main.temp_min);
      let maxTemp = this.KtoC(this.state.data.main.temp_max);
      let pressure = this.pressureCout(this.state.data.main.pressure);
      let icone = this.state.data.weather[0].icon;
      let url = `http://openweathermap.org/img/wn/${icone}@2x.png`;
      let weatherStatus = this.state.data.weather[0].main;

      return (
        <div>
          <div className={s.infoBoard}>
            <div>Region:{region}</div>
            <div>City: {city}</div>
          </div>
          <div>
            Temperature:
            <ul>
              <li>Now: {temp}°</li>
              <li>Min: {minTemp}°</li>
              <li>Max: {maxTemp}°</li>
            </ul>
            <div className={s.stBlock}>
              <h2> {weatherStatus}</h2>
              <img alt="ERR:Img cant download" src={url} />
            </div>
            <div> Pressure: {pressure} mm Hg</div>
          </div>
        </div>
      );
    }
  };
  pressureCout = (P) => {
    return Math.floor(P / 1.3333);
  };

  KtoC = (K) => {
    return Math.floor(K - 273.15);
  };
  inputValue = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        <Serch
          addWeatherToPage={this.addWeatherToPage}
          request={this.request}
          inputValue={this.inputValue}
        />
      </div>
    );
  }
}
