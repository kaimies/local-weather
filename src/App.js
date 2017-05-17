import React, { Component } from 'react';
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  getUserLoation() {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        return reject(new Error('Geolocation not supported'));
      }

      navigator.getCurrentPosition((position) => {
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
      </Container>
    );
  }
}

export default App;
