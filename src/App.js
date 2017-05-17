import React, { Component } from 'react';
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react';
import './App.css';

class App extends Component {
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
        <Segment>
        </Segment>
        <Button basic as="a" href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Powered by Dark Sky</Button>
        <Button basic floated="right" as="a" href="https://github.com/kaimies/local-weather" target="_blank" rel="noopener noreferrer">Source Code</Button>
      </Container>
    );
  }
}

export default App;
