import React, { Component } from 'react';
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react';
import jsonp from 'jsonp';
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

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">Weatcher App</Header>
        <Segment loading={this.state.isLoading}>
        </Segment>
        <Button basic as="a" href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Powered by Dark Sky</Button>
        <Button basic floated="right" as="a" href="https://github.com/kaimies/local-weather" target="_blank" rel="noopener noreferrer">Source Code</Button>
      </Container>
    );
  }
}

export default App;
