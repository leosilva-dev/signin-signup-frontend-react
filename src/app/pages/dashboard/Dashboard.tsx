import React from "react";
import { DarkModeCheckbox } from "../../shared/components";

import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-base flex-content-center flex-items-center">
      Olá dashboard
      <DarkModeCheckbox />
    </div>
  );
};
