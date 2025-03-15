import React, { useState } from "react";
import {
  useCurrentSurvey,
  useSurveyHistory,
  useSubmitSurveyResponse,
} from "../lib/queries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, PlusCircle, FileText, CheckCircle2 } from "lucide-react";

interface Survey {
  question: string;
  response: string;
  submittedAt: string;
}

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const { data: currentQuestion, isLoading: isLoadingQuestion } =
    useCurrentSurvey();
  const { data: surveyHistory, isLoading: isLoadingSurveys } =
    useSurveyHistory();
  const { mutate: submitResponse, isPending: isSubmitting } =
    useSubmitSurveyResponse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    submitResponse(response, {
      onSuccess: () => {
        setResponse("");
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
      onError: (err) => {
        setError(
          err instanceof Error ? err.message : "Failed to submit response"
        );
      },
    });
  };

  if (isLoadingQuestion || isLoadingSurveys) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-10 mx-auto px-4 py-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Employee Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Answer today's question and view your survey history
        </p>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-primary mr-2">
            <PlusCircle size={20} />
          </span>
          Today's Question
        </h2>
        {currentQuestion ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground/90">
                {currentQuestion.question}
              </h3>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Your response..."
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </Button>
            </div>
            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-600 sm:flex-1">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Response submitted successfully!
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No question available</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-primary mr-2">
            <FileText size={20} />
          </span>
          Survey History
        </h2>
        {surveyHistory && surveyHistory.length > 0 ? (
          <div className="space-y-4">
            {surveyHistory.map((survey: Survey, index: number) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <p className="font-bold">{survey.question}</p>
                <p className="mt-2">{survey.response}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(survey.submittedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No survey history available</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
