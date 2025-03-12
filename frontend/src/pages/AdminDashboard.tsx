import React from "react";
import { useAdminResponses } from "../lib/queries";

const AdminDashboard: React.FC = () => {
  const { data: responses, isLoading, error } = useAdminResponses();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to fetch responses</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-6">
        {responses && responses.length > 0 ? (
          responses.map((response: any, index: number) => (
            <div key={index} className="border p-4 rounded shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">{response.user.name}</h3>
                  <p className="text-gray-600">{response.user.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(response.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="font-medium mb-2">{response.question}</p>
                <p className="text-gray-700">{response.response}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No responses available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
