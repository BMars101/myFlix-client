import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setUser } from '../../actions/actions';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    axios.post('https://movie-api11.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('Username or password does not exist')
        formValidation();
      });
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (username.trim().length === 0) {
      usernameErr.usernameEmpty = "Please enter a username";
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordEmpty = "Please enter password";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  return (
    <Container className="form-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="form-label">
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)} />
          {Object.keys(usernameErr).map((key) => {
            return <div style={{ fontSize: 12, color: "red" }}>{usernameErr[key]}</div>
          })}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">
            Password:
        </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          {Object.keys(passwordErr).map((key) => {
            return <div style={{ fontSize: 12, color: "red" }}>{passwordErr[key]}</div>
          })}
        </Form.Group>
        <Button variant="outline-dark" className="button" type="button" onClick={handleSubmit}>Submit</Button>
        <Form.Group controlId="userRegister" className="user-register">
          <p>New users, click to register</p>
          <Link to={`/register`}>
            <Button variant="dark" className="register-button">
              Register
          </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(LoginView)

LoginView.proptypes = {
  onLoggedIn: PropTypes.func.isRequired
}

