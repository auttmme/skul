import { useEffect, useState } from "react";

function useFetch(url) {
  const [allData, setAllData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(url);

    store.read("Sheet1").then((data) => {
      setAllData(data);
      setIsPending(false);
    });
  }, [url]);

  return { allData, isPending };
}

export default useFetch;
