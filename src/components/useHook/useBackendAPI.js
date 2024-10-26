import axios from "axios";

export const useBackendAPI = () => {
  const BaseURL = "http://127.0.0.1:5000/api";
  return {
    uploadImage: async (formData) => {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/classification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    },
    severity_Detection: async (data) => {
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
    },
    preictimage_Angle: async (data) => {
      // const headers = {
      //   Authorization: "Bear " + getToken(),
      //   "Content-Type": "application/json",
      // };
      try {
        const res = await axios.post(
          BaseURL + "/prediction/predictions/angle",
          {
            data,
          }
          // { headers: headers }
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },

    EAI_Detection: async (data) => {
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
    },

    Classification_Detection: async (data) => {
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
    },
  };
};
