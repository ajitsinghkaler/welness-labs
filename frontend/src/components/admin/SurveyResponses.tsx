import React from "react";
import { useAdminResponses } from "../../lib/queries";
import { FileText } from "lucide-react";

// Define the SurveyResponse interface for proper typing
interface SurveyResponse {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  question: string;
  response: string;
  submittedAt: string;
}

const SurveyResponses: React.FC = () => {
  const { data: responses, isLoading, error } = useAdminResponses();

  // Handle CSV export functionality
  const handleExport = () => {
    if (!responses || responses.length === 0) return;
    
    const headers = ["Employee", "Email", "Question", "Response", "Date"];
    const csv = [
      headers.join(","), // Add headers to the CSV
      ...responses.map((r: SurveyResponse) =>
        [
          r.user.name,
          r.user.email,
          r.question,
          r.response,
          new Date(r.submittedAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey-responses.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div>Loading responses...</div>;
  }

  if (error) {
    return <div className="text-destructive p-6">Failed to fetch responses</div>;
  }

  return (
    <div className="space-y-10 mx-auto px-4 py-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Survey Responses</h1>
        <p className="text-muted-foreground mt-2">
          View and export employee survey responses
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="text-primary mr-2">
            <FileText size={20} />
          </span>
          Response List
        </h2>
        <button 
          onClick={handleExport}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded"
        >
          Export CSV
        </button>
      </div>
      
      <div className="space-y-6">
        {responses && responses.length > 0 ? (
          responses.map((response: SurveyResponse, index: number) => (
            <div key={response._id || index} className="border p-4 rounded shadow">
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

export default SurveyResponses; 