import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import './registration-view.scss';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //validation for user input fields
  const [emailErr, setEmailErr] = useState({});
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    axios.post(`https://movie-api11.herokuapp.com/users`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        props.setUser(data);
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user', e);
        alert('error registering user. Please try again');
        formValidation();
      });
  };

  const formValidation = () => {
    const emailErr = {};
    const usernameErr = {};
    const passwordErr = {};
    const birthdayErr = {};
    let isValid = true;

    if (!email.includes('@')) {
      emailErr.emailNotInclude = "Please enter valid email";
      isValid = false;
    }

    if (username.trim().length === 0) {
      usernameErr.usernameEmpty = "Please enter username"
      isValid = false;
    }

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters"
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordErr.passwordTooShort = "Password must be at least 5 characters";
      isValid = false;
    }

    if (birthday === '') {
      birthdayErr.selectDate = "Please enter a birthday";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setBirthdayErr(birthdayErr);
    return isValid;
  };

  return (
    <Container className="form_container">
      <Row>
        <Col xs={12} sm={12} className="form_col">
          <Form>
            <Form.Group>
              <Form.Label className="form-item">
                Username:
              </Form.Label>
              <Form.Control
                type="text"
                className="input_box"
                value={username}
                onChange={e => setUsername(e.target.value)} />
              {Object.keys(usernameErr).map((key) => { return <div style={{ fontSize: 12, color: "red" }}>{usernameErr[key]}</div> })}
            </Form.Group>
            <Form.Group className="register_form">
              <Form.Label className="form-item">
                Email:
                </Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)} />
              {Object.keys(emailErr).map((key) => {
                return <div style={{ fontSize: 12, color: "red" }}>{emailErr[key]}</div>
              })}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-item">
                Password:
              </Form.Label>
              <Form.Control
                type="password"
                className="input_box"
                value={password}
                onChange={e => setPassword(e.target.value)} />
              {Object.keys(passwordErr).map((key) => { return <div style={{ fontSize: 12, color: "red" }}>{passwordErr[key]}</div> })}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-item">
                Birthday:
              </Form.Label>
              <Form.Control
                type="date"
                className="input_box"
                value={birthday}
                onChange={e => setBirthday(e.target.value)} />
              {Object.keys(birthdayErr).map((key) => {
                return <div style={{ fontSize: 12, color: "red" }}>{birthdayErr[key]}</div>
              })}
            </Form.Group>
            <Button
              variant="outline-dark"
              className="button"
              type="button"
              onClick={handleRegister}>
              Submit
            </Button>
            <Link to={`/`}>
              <Button variant="dark" className="back-button" type="button">
                Back to Login
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container >
  );
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(RegistrationView)

RegistrationView.proptypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.any.isRequired,
    birthday: PropTypes.any.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}
