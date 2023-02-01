import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { authData, setauthData } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("login");
    setauthData({ login: null });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Skillhub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {authData && authData.login ? (
                <>
                  <Link className="nav-link" to="/admin/dashboard">
                    Dashboard
                  </Link>
                  <Link className="nav-link" to="client/account">
                    Account
                  </Link>
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                    >
                      {authData.login.name}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          onClick={handleLogout}
                          href="#"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
