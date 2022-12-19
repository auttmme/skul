import React from "react";
import Layout from "/components/common/layout";
import FormData from "/components/inputData/formData";

function InputData({ area }) {
  return (
    <Layout>
      <FormData area={area} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/area");
  const area = await res.json();

  return {
    props: {
      area,
    },
  };
}

export default InputData;
