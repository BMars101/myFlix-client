import React, { useState } from 'react';

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
    <form>
      <label>
        Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <lable>
        Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </lable>
      <label>
        Re-enter Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Birthday: <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}