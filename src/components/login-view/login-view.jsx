import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://movie-api11.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    //console.log(username, password);
    //props.onLoggedIn(username);
  };

  return (
    <Container className="form-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="form-label">
            Username:
      </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">
            Password:
        </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="outline-dark" className="button" type="button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}

LoginView.proptypes = {
  onLoggedIn: PropTypes.func.isRequired
}