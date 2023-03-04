import React, { useEffect } from "react";

function usePost(url) {
  const SteinStore = require("stein-js-client");
  const store = new SteinStore(url);

  const handleSubmit = () => {
    store
      .append("Sheet1", [
        {
          no: "6",
          name: "SMAN 78 Jakarta",
          type: "Negeri",
          address: "Jl. apapsjaksalksjkla",
          city: "Jakarta Barat",
          province: "DKI Jakarta",
        },
      ])
      .then((res) => {
        console.log(res);
      });
  };

  return { handleSubmit };
}

export default usePost;
