import axios from "axios";

let token = localStorage.getItem("reachinbox-auth");
token = token ? JSON.parse(token) : "";

export const getMailList = async (token) => {
  try {
    const res = await axios
      .get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    return res.data.data;
  } catch (err) {
    return console.log(err);
  }
};

export const getMailMessages = async (id, token) => {
  try {
    const res = await axios
      .get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    return res.data.data;
  } catch (err) {
    return console.log(err);
  }
};

export const postMailMessages = async (id, messages) => {
  try {
    const res = await axios
      .post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${id}`, messages, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log("Posted:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const deleteMailResponse = async (id, token) => {
  try {
    const res = await axios
      .delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log(res);
    return res;
  } catch (err) {
    return console.log(err);
  }
};
export const resetMail = async (token) => {
  try {
    const res = await axios
      .get(`https://hiring.reachinbox.xyz/api/v1/onebox/reset`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    console.log(res);
    return res;
  } catch (err) {
    return console.log(err);
  }
};
