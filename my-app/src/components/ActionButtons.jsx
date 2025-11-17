import React from "react";
import { Button, message } from "antd";

const ActionButtons = ({onRefresh, loadingAction, setLoadingAction}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // Reusable API handler
  const handleApiRequest = async (url, actionName, method) => {
    try {
      setLoadingAction(actionName);
      message.loading({ content: `${actionName} in progress...`, key: actionName });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const data = await response.json();

      message.success({
        content: data.message || `${actionName} completed successfully!`,
        key: actionName,
      });

      // ✅ trigger table refresh after success
      onRefresh();
    } catch (error) {
      console.error(`Error during ${actionName}:`, error);
      message.error({
        content: `Failed to ${actionName.toLowerCase()}. Please try again.`,
        key: actionName,
      });
    } finally {
      setLoadingAction(""); // remove button loading
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-6 bg-white shadow-sm rounded-lg">
      <Button
        type="primary"
        loading={loadingAction === "Upload data from CSV"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/add-assignment-data`,
            "Upload data from CSV",
            "POST"
          )
        }
      >
        Upload data from CSV
      </Button>

      <Button
        loading={loadingAction === "Clone Assessment Template"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/clone-assessment-template`,
            "Clone Assessment Template",
            "POST"
          )
        }
      >
        Clone Assessment Template
      </Button>

      <Button
        loading={loadingAction === "Create Assignment"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/create-assignments`,
            "Create Assignment",
            "POST"
          )
        }
      >
        Create Assignment
      </Button>

      <Button
        loading={loadingAction === "Create Lecture"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/create-lectures`,
            "Create Lecture",
            "POST"
          )
        }
      >
        Create Lecture
      </Button>

      <Button
        type="dashed"
        loading={loadingAction === "Update Notes"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/start-update-notes`,
            "Update Notes",
            "POST"
          )
        }
      >
        Update Notes
      </Button>

      <Button
        type="primary"
        danger
        loading={loadingAction === "Clear data from CSV"}
        onClick={() =>
          handleApiRequest(
            `${apiUrl}/api/cleardata`,
            "Clear data from CSV",
            "DELETE"
          )
        }
      >
        Clear data from CSV
      </Button>
    </div>
  );
};

export default ActionButtons;
