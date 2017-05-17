import React, { Component } from 'react';
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react';
import jsonp from 'jsonp';
import cloud from './weather-icons/Cloud.svg';
import sun from './weather-icons/Sun.svg';
import moon from './weather-icons/Moon.svg';
import wind from './weather-icons/Wind.svg';
import cloudFog from './weather-icons/Cloud-Fog.svg';
import cloudHail from './weather-icons/Cloud-Hail.svg';
import cloudMoon from './weather-icons/Cloud-Moon.svg';
import cloudRain from './weather-icons/Cloud-Rain.svg';
import cloudSnow from './weather-icons/Cloud-Snow.svg';
import cloudSun from './weather-icons/Cloud-Sun.svg';
import degreesCelcius from './weather-icons/Degrees-Celcius.svg';
import degreesFahrenheit from './weather-icons/Degrees-Fahrenheit.svg';
import './App.css';

const TEMPERATURE_UNIT_FAHRENHEIT = 'fahrenheit';
const TEMPERATURE_UNIT_CELSIUS = 'celsius';

class App extends Component {
  constructor() {
    super();

    this.state = {
      temperature: '',
      icon: '',
      temperatureUnit: TEMPERATURE_UNIT_FAHRENHEIT,
      error: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getWeatherInfo();
  }

  fetch = (url) => {
    return new Promise((resolve, reject) => {
      jsonp(url, (err, response) => {
        if (err) {
          return reject(err);
        }

        return resolve(response);
      });
    });
  }

  getWeatherInfo() {
    this.setState({ loading: true });
    this.getUserLocation()
      .then(coords => this.fetch(`https://api.darksky.net/forecast/ef5408b43a3bf90eec0abd7e0684947c/${coords.latitude},${coords.longitude}`))
      .then(response => this.setState({ temperature: response.currently.temperature, icon: response.currently.icon, isLoading: false, error: '' }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        return reject(new Error('Geolocation not supported'));
      }

      navigator.geolocation.getCurrentPosition((position) => {
        return resolve(position.coords);
      });
    });
  }

  renderWeatherIcon() {
    switch(this.state.icon) {
      case 'clear-day':
        return <img src={sun} alt={this.state.icon}/>;
      case 'clear-night':
        return <img src={moon} alt={this.state.icon}/>;
      case 'rain':
        return <img src={cloudRain} alt={this.state.icon}/>;
      case 'snow':
        return <img src={cloudSnow} alt={this.state.icon}/>;
      case 'sleet':
        return <img src={cloudHail} alt={this.state.icon}/>;
      case 'fog':
        return <img src={cloudFog} alt={this.state.icon}/>;
      case 'partly-cloudy-day':
        return <img src={cloudSun} alt={this.state.icon}/>;
      case 'partly-cloudy-night':
        return <img src={cloudMoon} alt={this.state.icon}/>;
      case 'cloudy':
        return <img src={cloud} alt={this.state.icon}/>;
      case 'wind':
        return <img src={wind} alt={this.state.icon}/>;
      default:
        return <img src={sun} alt={this.state.icon}/>;
    }
    
  }

  renderTemperatureButtons() {
    return (
      <Button.Group basic>
        <Button active={this.state.temperatureUnit === TEMPERATURE_UNIT_FAHRENHEIT} onClick={() => this.setState({ temperatureUnit: TEMPERATURE_UNIT_FAHRENHEIT })}>°F</Button>
        <Button active={this.state.temperatureUnit === TEMPERATURE_UNIT_CELSIUS} onClick={() => this.setState({ temperatureUnit: TEMPERATURE_UNIT_CELSIUS })}>°C</Button>
      </Button.Group>
    );
  }

  renderWeatherInfo() {
    if (this.state.isLoading) {
      return null;
    }

    let temperatureUnit = '°F';
    let temperature = this.state.temperature;

    if (this.state.temperatureUnit === TEMPERATURE_UNIT_CELSIUS) {
      temperatureUnit = '°C';
      temperature = (temperature - 32) * 5 / 9;
    }

    return (
      <div>
        <Header size="large">
          {this.renderWeatherIcon()}
          <Header.Content>
            {`${Math.round(temperature)} ${temperatureUnit}`}
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center" size="huge">Weather App</Header>
        <Segment loading={this.state.isLoading} textAlign="center">
          {this.renderWeatherInfo()}
          {this.renderTemperatureButtons()}
        </Segment>
        <Button basic as="a" href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Powered by Dark Sky</Button>
        <Button basic floated="right" as="a" href="https://github.com/kaimies/local-weather" target="_blank" rel="noopener noreferrer">Source Code</Button>
      </Container>
    );
  }
}

export default App;
