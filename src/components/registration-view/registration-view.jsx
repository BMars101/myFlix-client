import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Form>
      <Form.Group>
        <Form.Label>
          Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Label>
        <Form.Label>
          Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Label>
        <Form.Label>
          Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
        <Form.Label>
          Re-enter Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
        <Form.Label>
          Birthday: <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}