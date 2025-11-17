import React, { useEffect, useState } from "react";
import { Table, Spin, message, Button } from "antd";


const DataTable = ({refreshKey}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert backend values ("yes"/"true") → boolean
  const isTrue = (val) => {
    if (!val) return false;
    const v = val.toString().toLowerCase();
    return v === "true" || v === "yes";
  };

  // Fetch Data
  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      message.loading({ content: "Fetching data...", key: "fetch" });
      const res = await fetch(`${apiUrl}/api/get-automation-status`);
      const result = await res.json();
      console.log("🚀 ~ fetchData ~ result:", result)

      if (!result.assignments) {
        setData([]);
        return message.warning("No data available");
      }

      const formattedData = result.assignments.map((item, index) => ({
        key: index + 1,
        title: item.title || "N/A",
        batch: item.batch || "N/A",
        section: item.section || "N/A",
        assessmentClone: item.isCloned || "N/A",
        assignmentCreated: item.isAssignmentCreated || "N/A",
        notesUpdated: item.isNotesUpdated || "N/A",
        assessmentCloneFlag: isTrue(item.isCloned),
        assignmentCreatedFlag: isTrue(item.isAssignmentCreated),
        notesUpdatedFlag: isTrue(item.isNotesUpdated),
      }));

      setData(formattedData);
      message.success({ content: "Data loaded successfully", key: "fetch" });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error({ content: "Failed to load data", key: "fetch" });
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [refreshKey]); // <== 🔥 now refetches whenever refreshKey changes


  // 🔁 Toggle handler
  const handleToggle = async (record, field) => {
    // Step 1: update frontend immediately
    const updatedData = data.map((row) => {
      if (row.key === record.key) {
        return {
          ...row,
          [field]: "true",
          [`${field}Flag`]: true,
        };
      }
      return row;
    });
    setData(updatedData);

    // Step 2: send update to backend
    try {
      const res = await fetch(`${apiUrl}/api/update-automation-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: record.title,
          field, // e.g. "assignmentCreated"
          newValue: "true",
        }),
      });

      if (!res.ok) throw new Error("Failed to update backend");

      message.success(`${field} marked as done ✅`);
    } catch (error) {
      message.error("Backend update failed ❌");
      console.error(error);
    }
  };

  // 🧱 Table Columns
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Batch", dataIndex: "batch", key: "batch" },
    { title: "Section", dataIndex: "section", key: "section" },

    {
      title: "Assessment Clone",
      dataIndex: "assessmentClone",
      key: "assessmentClone",
      filters: [
        { text: "yes", value: "yes" },
        { text: "no", value: "no" },
      ],
      onFilter: (value, record) => {
        if (value === "no") return !record.assessmentCloneFlag;
        return record.assessmentClone.toLowerCase() === value;
      },
      render: (value, record) => (
        <div
          style={{
            backgroundColor: record.assessmentCloneFlag ? "#e8f5e9" : "#fde2e2",
            padding: "5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {record.assessmentCloneFlag ? (
            "true"
          ) : (
            <Button
              size="small"
              type="dashed"
              onClick={() => handleToggle(record, "assessmentClone")}
            >
              Mark True
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Assignment Created",
      dataIndex: "assignmentCreated",
      key: "assignmentCreated",
      filters: [
        { text: "true", value: "true" },
        { text: "false", value: "false" },
      ],
      onFilter: (value, record) => {
        if (value === "false") return !record.assignmentCreatedFlag;
        return record.assignmentCreated.toLowerCase() === value;
      },
      render: (value, record) => (
        <div
          style={{
            backgroundColor: record.assignmentCreatedFlag ? "#e8f5e9" : "#fde2e2",
            padding: "5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {record.assignmentCreatedFlag ? (
            "true"
          ) : (
            <Button
              size="small"
              type="dashed"
              onClick={() => handleToggle(record, "assignmentCreated")}
            >
              Mark True
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Notes Updated",
      dataIndex: "notesUpdated",
      key: "notesUpdated",
      filters: [
        { text: "Yes", value: "true" },
        { text: "No / N/A", value: "no" },
      ],
      onFilter: (value, record) => {
        if (value === "no") return !record.notesUpdatedFlag;
        return record.notesUpdated.toLowerCase() === value;
      },
      render: (value, record) => (
        <div
          style={{
            backgroundColor: record.notesUpdatedFlag ? "#e8f5e9" : "#fde2e2",
            padding: "5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {record.notesUpdatedFlag ? (
            "true"
          ) : (
            <Button
              size="small"
              type="dashed"
              onClick={() => handleToggle(record, "notesUpdated")}
            >
              Mark True
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
        />
      )}
    </div>
  );
};

export default DataTable;
