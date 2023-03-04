import React, { useEffect, useState } from "react";

function useFetch(url) {
  const [allData, setAllData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  // const fetchData = async () => {
  //   const res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error("Data could not be fetched");
  //   } else {
  //     return await res.json();
  //   }
  // };

  useEffect(() => {
    // fetchData()
    //   .then((data) => {
    //     setAllData(data);
    //     setIsPending(false);
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //     setError(e.message);
    //     setIsPending(false);
    //   });

    const SteinStore = require("stein-js-client");
    const store = new SteinStore(url);

    store.read("Sheet1").then((data) => {
      console.log(data);
      setAllData(data);
      setIsPending(false);
    });
  }, [url]);

  return { allData, isPending, error };
}

export default useFetch;
