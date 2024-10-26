import axios from "axios";
import { Navigate } from "react-router-dom";
const BaseURL = "http://127.0.0.1:5000/api";

export const preictimage = async (data) => {
  const headers = {
    Authorization: "Bear " + getToken(),
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      BaseURL + "/prediction/predictions",
      {
        data,
      },
      { headers: headers }
    );
    //errorhandding(res)
    //  console.log(res)
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const preictimage_Angle = async (data) => {
  const headers = {
    Authorization: "Bear " + getToken(),
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      BaseURL + "/prediction/predictions/angle",
      {
        data,
      },
      { headers: headers }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const severity_Detection = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      BaseURL + "/upload",
      {
        data,
      },
      { headers: headers }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const EAI_Detection = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      BaseURL + "/xai",
      {
        data,
      },
      { headers: headers }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const Classification_Detection = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      BaseURL + "/classification",
      {
        data,
      },
      { headers: headers }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const Gethistory = async () => {
  const headers = {
    Authorization: "Bear " + getToken(),
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.get(BaseURL + "/prediction/history", {
      headers: headers,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const errorhandding = (res) => {
  // const navigate = Navigate()
  let message = null;
  console.log(res.status);

  if (res.status === 500) {
    message = "Server is not availble or error encounterd";
    // navigate("/login")
  } else if (res.status === 404) {
    message = "Not found";
    // navigate("/login")
  } else if (res.status === 401) {
    message = "You Don't have permission";
    // navigate("/login")
  }

  return message;
};
const storeToken = (data) => {
  localStorage.setItem("token", data);
};

const getToken = () => {
  return localStorage.getItem("token");
};

export const verifyuser = () => {
  const data = getToken();
  if (data === null || data === undefined) {
    return false;
  } else {
    return true;
  }
};
