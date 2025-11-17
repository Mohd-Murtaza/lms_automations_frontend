import React, { useState, useRef } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0); // used to re-render table
  const [loadingAction, setLoadingAction] = useState(""); // tracks which button is loading

  // function to refresh table
  const refreshTable = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="p-6 space-y-6">
      <ActionButtons
        onRefresh={refreshTable}
        loadingAction={loadingAction}
        setLoadingAction={setLoadingAction}
      />
      <DataTable key={refreshKey} />
    </div>
  );
};

export default Dashboard;
