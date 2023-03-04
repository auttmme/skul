import React from "react";
import Layout from "/components/common/layout";
import FormData from "/components/inputData/formData";

function InputData({ area }) {
  console.log("area:", area !== null);
  return <Layout>{area && <FormData area={area} />}</Layout>;
}

export async function getServerSideProps() {
  const res = await fetch("http://127.0.0.1:3000/api/area");
  const area = await res.json();

  return {
    props: {
      area: area?.area,
    },
  };
}

export default InputData;
