import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children, title = "Dashboard" }) => {
  return (
    <div className="d-flex vh-100 vw-100 m-0 p-0 overflow-hidden dashboard-layout-root">
      <Sidebar />
      <main className="flex-grow-1 w-100 min-vw-0 d-flex flex-column">
        <Header title={title} />
        <section className="flex-grow-1 overflow-auto p-4">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
