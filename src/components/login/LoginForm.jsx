import React, {useState} from "react";
import './LoginForm.css';
import UserCredentials from '../userCredentials/UserCredentials';

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userCredentials = UserCredentials();

    const handleLogin = (event) => {
        event.preventDefault();
        const user = userCredentials.find(
            (cred) => cred.username === username && cred.password === password
        );
        if (user) {
            onLogin(user.username);
            localStorage.setItem("currentUser", user.username);
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className='box-login '>
                <form onSubmit={handleLogin}>
                    <input className='userlogin'
                           type="text"
                           placeholder="Enter your username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                    />
                    <input className='userpassword'
                           type="password"
                           placeholder="Enter your password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />
                    <button className='userbutton' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
