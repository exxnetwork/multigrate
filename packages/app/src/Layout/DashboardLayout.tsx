import React from "react";

import MainPanel from "components/MainPanel";
import Sidebar from "components/Sidebar";

interface DashboardProps {
  pageTitle: string;
  subTitle: string;
  children: JSX.Element;
}

const DashboardLayout = ({ children, pageTitle, subTitle }: DashboardProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainPanel {...{ pageTitle, subTitle }}>{children}</MainPanel>
    </div>
  );
};

export default DashboardLayout;
