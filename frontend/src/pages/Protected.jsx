import React from "react";
import { useContext } from "react";
import { AuthContext } from "../App";

const Protected = ({ element }) => {
  const { authData } = useContext(AuthContext);

  return authData && authData.login ? element : "Un Autherized Access";
};

export default Protected;
