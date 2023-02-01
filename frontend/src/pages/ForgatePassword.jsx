import React, { useState } from "react";
import axios from "axios";

function ForgatePassword() {
  const [email, setEmail] = useState("dhakneashwini6@gmail.com");
  const handleForgatePassword = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/auth/forget-password",
      { email }
    );
  };
  return (
    <>
      <div className=" container">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button
          type="button"
          onClick={handleForgatePassword}
          class="btn-btn-primary"
        >
          continue
        </button>
      </div>
    </>
  );
}

export default ForgatePassword;
