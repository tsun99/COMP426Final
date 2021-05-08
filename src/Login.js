import React from 'react'

const Login = (props) => {

    const{email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError} = props;

    return (
            <section className="login">
                <div className="loginContainer">
                    <label>Username</label>
                    <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
                    <p className="errorMsg">{emailError}</p>
                    <label>password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <p className="errorMsg">{passwordError}</p>
                    <div className="btnContainer">
                        {hasAccount ?(
                            <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don't have an Account?<span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                            </>
                        ):(
                            <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>Already have an account?<span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                            </>
                        )}
                    </div>
                </div>
            </section>
    )
}

export default Login
