import {useState} from 'react'
import Header from "../components/shared/Header"

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform login logic here, e.g., send username and password to a server
      console.log('Username:', username);
      console.log('Password:', password);
      // Reset form fields
      setUsername('');
      setPassword('');
    };

    return <>
    <Header></Header>
    <h1>Login page</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    </>
}