import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { userLogin } from "../api/UserAuth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(email, password)
      if(!response.ok) {
        const errorData = await response.json()
        console.log('Failed to login', errorData)
        toast.error(errorData.message)
        return
      }
      const data = await response.json()
      console.log(data.data)
      const {user, token, message} = data.data
      console.log('User Loged in', user.role, token)
      login(user, token)
      toast.success(message)
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "customer") {
        navigate("/customer/dashboard");
      } else if (user.role === "service") {
        navigate("/service/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log('Failed to login', error)
      toast.error('Failed to login, try again!')
      return
    }
  };


  return (
    <div className="login-page">
      <header className="header">
        <div className="container">
          <h1>Välkommen tillbaka!</h1>
          <p>Logga in för att fortsätta till våra tjänster.</p>
        </div>
      </header>

      <main className="container">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-postadress</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ange din e-post"
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange ditt lösenord"
              // required
            />
          </div>

          <button type="submit" className="btn-primary" onClick={handleLogin}>
            Logga in
          </button>
        </form>

        <div className="login-links">
          <p>
            Har du inget konto? <Link to="/register">Registrera dig här</Link>
          </p>
          <p>
            <Link to="/forgot-password">Glömt lösenordet?</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
