import { useRouter } from "next/router";
import InputData from "pages/inputData";
import { useEffect, useState } from "react";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    const SteinStore = require("stein-js-client");
    const store = new SteinStore(
      "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
    );

    store.read("Sheet1", { search: { id: id } }).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  console.log(id);
  console.log(data);

  return (
    <div>
      {data.map((d) => (
        <div>
          <p>NAMA SEKOLAH: {d.name}</p>
          <p>TIPE: {d.type}</p>
          <p>PROVINSI: {d.province}</p>
          <p>KOTA: {d.city}</p>
          <p>ALAMAT: {d.address}</p>
        </div>
      ))}
    </div>
  );
};

export default Details;
