import React, { useContext } from "react";
import { AuthContext } from "../../App";

const Acoount = () => {
  const { authData } = useContext(AuthContext);
  return (
    <>
      <h1>{authData && authData.login.token}</h1>
      <div className="classname">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div class="card-header">{authData.login.name}'s Profile </div>

              <div class="card-body">
                <h1>Name:{authData.login.name}</h1>
                <h1>Email:{authData.login.email}</h1>
                <p>
                  Account:
                  {authData.login.active ? (
                    <span className="text-success"> Active</span>
                  ) : (
                    <span className="text-danger"> In-Active</span>
                  )}
                </p>
                <p>
                  Accoun Typet:
                  {authData.login.admin ? (
                    <span className="text-success"> Admin</span>
                  ) : (
                    <span className="text-danger"> user</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acoount;
