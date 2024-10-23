import axios from "axios";

export const useBackendAPI = () => {
  return {
    uploadImage: async (formData) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/acne/classifier/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    },
  };
};
