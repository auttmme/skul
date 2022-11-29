import React from "react";
import Sidebar from "../components/sidebar";
import DataTable from "../components/table";

function Home() {
  return (
    <div>
      <Sidebar children={<DataTable />} />
    </div>
  );
}

export default Home;
