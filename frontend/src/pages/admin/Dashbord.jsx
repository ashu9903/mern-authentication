import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../App";

const Dashbord = () => {
  const { authData } = useContext(AuthContext);
  const getAllUsers = async (e) => {
    const { data } = await axios.get("http://localhost:5000/user", {
      headers: {
        Authorization: authData.login.token,
      },
    });
    console.log(data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return <div>dashborad</div>;
};

export default Dashbord;
