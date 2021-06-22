import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "efe89aa96c75ca22481631a4fdf67586";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();
      console.log(data);

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      
      this.setState({
        temp: Math.round(data.main.temp - 275.15) + "°C",
        city: data.name,
        country: data.sys.country,
        weather_des: data.weather[0].description,
        sunset: sunset_date,
        error: undefined
      });
    }else {
      this.setState ({
        temp: undefined,
        city: undefined,
        country: undefined,
        weather_des: undefined,
        sunset: undefined,
        error: "Введіть назву міста!!!"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info"><Info /></div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather 
                  temp = {this.state.temp}
                  city = {this.state.city}
                  country = {this.state.country}
                  weather_des = {this.state.weather_des}
                  sunset = {this.state.sunset}
                  error = {this.state.error}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;