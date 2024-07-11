import React, { useState } from "react";

function LoginForm() {
    const [tab, setTab] = useState("login");

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    return (
        <section className="main">
            <div className="form_wrapper">
                <input
                    type="radio"
                    className="radio"
                    name="radio"
                    id="login"
                    checked={tab === "login"}
                    onChange={() => handleTabChange("login")}
                />
                <input
                    type="radio"
                    className="radio"
                    name="radio"
                    id="signup"
                    checked={tab === "signup"}
                    onChange={() => handleTabChange("signup")}
                />
                <div className="tile">
                    <h3 className={tab === "login" ? "login" : "signup"}>Login Form</h3>
                    <h3 className={tab === "signup" ? "login" : "signup"}>Signup Form</h3>
                </div>

                <label className="tab login_tab" htmlFor="login">
                    Login
                </label>

                <label className="tab signup_tab" htmlFor="signup">
                    Signup
                </label>
                <span className="shape"></span>
                <div className="form_wrap">
                    <div className={`form_fild ${tab === "login" ? "login_form" : "signup_form"}`}>
                        <div className="input_group">
                            <input type="email" className="input" placeholder="Email Address" />
                        </div>
                        <div className="input_group">
                            <input type="password" className="input" placeholder="Password" />
                        </div>

                        {tab === "login" && <a href="#forgot" className="forgot">Forgot password?</a>}

                        <input type="submit" className="btn" value={tab === "login" ? "Login" : "Signup"} />

                        {tab === "login" && (
                            <div className="not_mem">
                                <label htmlFor="signup">
                                    Not a member? <span> Signup now</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
