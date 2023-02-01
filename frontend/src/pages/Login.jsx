import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import auth from "../service/auth";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  const navigate = useNavigate();
  const { authData, setauthData } = useContext(AuthContext);
  const [loginData, setloginData] = useState({
    email: "ashwini@gmail.com",
    password: "123",
  });
  const handleSubmit = async () => {
    try {
      const { data } = await auth.post("/login", loginData);
      localStorage.setItem("login", JSON.stringify(data.result));
      setauthData({ login: data.result });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authData && authData.login && authData.login.admin) {
      navigate("/admin/dashboard");
    } else if (authData && authData.login) {
      navigate("/client/account");
    }
  }, [authData]);

  const handleSuccess = async (res) => {
    console.log(res);
    const { data } = await auth.post("/login-with-google", {
      tokenId: res.tokenId,
    });
    console.log(data);
  };
  const handleFail = (res) => {
    console.log(res);
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "709476600777-5vqlf0cc0p5ba776tijh2e9mrn9os369.apps.googleusercontent.com",
      });
    });
  }, []);

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                <div>
                  <label for="email" class="form-label">
                    First Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    onChange={(e) =>
                      setloginData({ ...loginData, email: e.target.value })
                    }
                    value={loginData.email}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <div class="mt-2">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                    onChange={(e) =>
                      setloginData({ ...loginData, password: e.target.value })
                    }
                    value={loginData.password}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  class="btn btn-primary w-100 mt-3"
                >
                  Login
                </button>
                <p class="text-center mt-3">
                  Dont Have Account? <a href="#">Create Account</a>
                </p>
                <p className="text">
                  <Link to="/forget-password">Forget Password</Link>
                </p>
                <div className="text-center">
                  <h1>OR</h1>
                  <GoogleLogin
                    clientId="709476600777-5vqlf0cc0p5ba776tijh2e9mrn9os369.apps.googleusercontent.com"
                    buttonText="Continue With Google"
                    onSuccess={handleSuccess}
                    onFailure={handleFail}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
