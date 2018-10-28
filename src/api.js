import request from "./utils/request";

const URL = "http://localhost:8888/dogs";

export default {
  dogs: {
    search: criteria => request(`${URL}?name_like=${criteria}`),
    add: ({name, image}) =>
      request({
        url: URL,
        method: "POST",
        data: {
          name,
          image,
        },
      }),
  },
};
