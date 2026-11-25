import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

const Signup = () => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleonSubmit = async (e)=>{
        e.preventDefault();

        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if(!name || !email || !password){
            return handleError("All Fields are required!")
        }

        if(password.length < 8){
          return handleError("Passwrod must be atleast 8 characters!");
        }

        if(!emailRegex.test(email)){
          return handleError("Please enter a valid email");
        }

        const userData = {
            name,
            email,
            password 
        };

        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Signup failed");
            }

            const {success, error} = result;
            if(success){
              handleSuccess("Account created successfully!");
              setTimeout(() => {
              }, 1000);
            }
            else if(error){
              const details = error?.details[0].message
              handleError(details);
            }
            
            console.log(result);
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            navigate('/login');
            
        }catch(err){
            handleError(err.message || err);
        }

    }

  return (
    <main className="auth-page">
      <section className="auth-layout" aria-label="Create your account">
        <aside className="auth-showcase">
          <Link className="brand" to="/login" aria-label="LoginLogout home">
            <span className="brand-mark">L</span>
            <span>LoginLogout</span>
          </Link>
          <div className="showcase-copy">
            <span className="eyebrow">A fresh start</span>
            <h2>Your next chapter starts here.</h2>
            <p>Create an account to get started. It only takes a moment.</p>
          </div>
          <div className="showcase-orbit showcase-orbit-one" />
          <div className="showcase-orbit showcase-orbit-two" />
          <div className="showcase-note">
            <span className="note-dot" />
            <span>Simple, secure, and all yours.</span>
          </div>
        </aside>

        <div className="auth-content">
          <div className="auth-card">
            <div className="mobile-brand">
              <span className="brand-mark">L</span>
              <span>LoginLogout</span>
            </div>
            <span className="eyebrow">Get started</span>
            <h1>Create your account</h1>
            <p className="auth-description">Enter your details below to sign up.</p>

            <form onSubmit={handleonSubmit} className="auth-form">
              <div className="form-field">
                <label htmlFor="name">Full name</label>
                <input id="name" type="text" name="name" placeholder="Enter your name" autoComplete="name" autoFocus ref={nameRef} />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" ref={emailRef} />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="At least 8 characters" autoComplete="new-password" ref={passwordRef} />
              </div>

              <button className="auth-button" type="submit">Create account <span aria-hidden="true">→</span></button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <span className="auth-footnote">Your details are kept private and secure.</span>
        </div>
        <ToastContainer />
      </section>
    </main>
  )
}

export default Signup