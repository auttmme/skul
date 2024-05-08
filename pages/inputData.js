import React from "react";
import FormData from "/components/inputData/formData";

function InputData({ area }) {
  return area && <FormData area={area} />;
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
