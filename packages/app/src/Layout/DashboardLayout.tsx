import React from "react";

import MainPanel from "components/MainPanel";
import Sidebar from "components/Sidebar";

interface DashboardProps {
  pageTitle: string;
  subTitle: string;
  isEXX?: boolean;
  children: JSX.Element;
}

const DashboardLayout = ({
  children,
  pageTitle,
  subTitle,
  isEXX = false,
}: DashboardProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainPanel {...{ pageTitle, subTitle, isEXX }}>{children}</MainPanel>
    </div>
  );
};

export default DashboardLayout;
