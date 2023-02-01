import React, { useState } from "react";
import auth from "../service/auth";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { id } = useParams();
  const [resetData, setresetData] = useState({
    password: "0001",
    cpassword: "0001",
  });
  const handleResetPassword = async () => {
    const { data } = await auth.post("/reset-password", resetData, {
      params: {
        userId: id,
      },
    });
    console.log(data);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div class="card">
              <div class="card-body">
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="enter new pass"
                  value={resetData.password}
                  onChange={(e) =>
                    setresetData({ ...resetData, password: e.target.value })
                  }
                />
                <br />
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="confirm new data"
                  value={resetData.cpassword}
                  onChange={(e) =>
                    setresetData({ ...resetData, cpassword: e.target.value })
                  }
                />
                <br />
                <button
                  type="submit"
                  class="btn btn-primary my-3"
                  onClick={handleResetPassword}
                >
                  reset password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
