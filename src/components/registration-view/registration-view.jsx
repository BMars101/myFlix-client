import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Form className="form_body">
      <Form.Group className="register_form">
        <Form.Label className="form-item">
          Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-item">
          Username: <input type="text" className="input_box" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-item">
          Password: <input type="password" className="input_box" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-item">
          Re-enter Password: <input type="password" className="input_box" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-item">
          Birthday: <input type="date" className="input_box" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.proptypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.any.isRequired,
  birthday: PropTypes.any.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}