
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

const Login = () => {  

  const emailRef = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();

  const handleLoginform = async (e)=>{
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordref.current.value;

    if(!email || !password){
      return handleError("email and password are required")
    }

    const loginData = {
      email,
      password
    }

    try{
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers:  {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if(!response.ok){
        throw new Error(result.message || "Email or password is incorrect try again!")
      }
      const { token, user } = result;
      if (!token || !user?.name) {
        throw new Error("Login response did not include a token and user name");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", user.name);
      handleSuccess("Logged in successfully!");
      emailRef.current.value = "";
      passwordref.current.value = "";
      
              setTimeout(() => {
                navigate('/home');
              }, 1000);

    }catch(err){
      handleError(err.message || err);
    }

  }

  return (
    <main className="auth-page">
      <section className="auth-layout" aria-label="Log in to your account">
        <aside className="auth-showcase">
          <Link className="brand" to="/login" aria-label="LoginLogout home">
            <span className="brand-mark">L</span>
            <span>LoginLogout</span>
          </Link>
          <div className="showcase-copy">
            <span className="eyebrow">Welcome back</span>
            <h2>Good to see you again.</h2>
            <p>Log in to pick up right where you left off.</p>
          </div>
          <div className="showcase-orbit showcase-orbit-one" />
          <div className="showcase-orbit showcase-orbit-two" />
          <div className="showcase-note">
            <span className="note-dot" />
            <span>Your space is waiting for you.</span>
          </div>
        </aside>

        <div className="auth-content">
          <div className="auth-card">
            <div className="mobile-brand">
              <span className="brand-mark">L</span>
              <span>LoginLogout</span>
            </div>
            <span className="eyebrow">Your account</span>
            <h1>Welcome back</h1>
            <p className="auth-description">Enter your email and password to log in.</p>

            <form onSubmit={handleLoginform} className="auth-form">
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" autoFocus ref={emailRef} />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="Enter your password" autoComplete="current-password" ref={passwordref} />
              </div>

              <button className="auth-button" type="submit">Log in <span aria-hidden="true">→</span></button>
            </form>

            <p className="auth-switch">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
          <span className="auth-footnote">Your details are kept private and secure.</span>
        </div>
        <ToastContainer />
      </section>
    </main>
  )
}

export default Login