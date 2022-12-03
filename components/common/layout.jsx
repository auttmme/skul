import React from "react";
import Sidebar from "./sidebar";

function Layout({ children }) {
  return <Sidebar>{children}</Sidebar>;
}

export default Layout;
