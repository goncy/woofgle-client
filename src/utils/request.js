import axios from "axios";

export default (...params) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(axios(...params).then(res => res.data));
    }, 500)
  );
