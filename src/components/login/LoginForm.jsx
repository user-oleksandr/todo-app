import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginForm.css";

const LoginForm = ({onLogin, onRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter your username and password");
            return;
        }
        onLogin(username);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter a username and password to register");
            return;
        }
        onRegister(username, password);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className='col-8'>
                    <h3 className='text-center'>{isRegistering ? "Register" : "Login"}</h3>
                    <div className="box-login">
                        <form>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {isRegistering ? (
                                <button className='btn btn-secondary btn-sm' onClick={handleRegister}>
                                    Register
                                </button>
                            ) : (
                                <button className='btn btn-secondary btn-sm' onClick={handleLogin}>
                                    Login
                                </button>
                            )}
                            {!isRegistering ? (
                                <p className="text">
                                    Don't have an account?{" "}
                                    <span className="toggle-link" onClick={() => setIsRegistering(true)}>
                Register here.
              </span>
                                </p>
                            ) : (
                                <p className="text">
                                    Already have an account?{" "}
                                    <span className="toggle-link" onClick={() => setIsRegistering(false)}>
                Login here.
              </span>
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
