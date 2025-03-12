import React, { useState } from 'react';
import { useCurrentSurvey, useSurveyHistory, useSubmitSurveyResponse } from '../lib/queries';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { AlertCircle } from 'lucide-react';

interface Survey {
  question: string;
  response: string;
  submittedAt: string;
}

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: currentQuestion, isLoading: isLoadingQuestion } = useCurrentSurvey();
  const { data: surveyHistory, isLoading: isLoadingSurveys } = useSurveyHistory();
  const { mutate: submitResponse, isPending: isSubmitting } = useSubmitSurveyResponse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    try {
      submitResponse(response, {
        onSuccess: () => {
          setResponse('');
          setError(null);
          setSuccess(true);
        },
        onError: () => {
          setError('Failed to submit response');
        },
      });
    } catch (err) {
      setError('Failed to submit response');
    }
  };

  if (isLoadingQuestion || isLoadingSurveys) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Today's Question</h2>
        {currentQuestion ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-foreground/90">{currentQuestion.question}</h2>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Your response..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Response'}
              </Button>
              {success && (
                <div className="flex items-center gap-2 text-green-600 animate-in fade-in slide-in-from-right">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Response submitted successfully!</span>
                </div>
              )}
            </div>
          </form>
        ) : (
          <p>No question available</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Survey History</h2>
        {surveyHistory && surveyHistory.length > 0 ? (
          <div className="space-y-4">
            {surveyHistory.map((survey: Survey, index: number) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-bold">{survey.question}</p>
                <p className="mt-2">{survey.response}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(survey.submittedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No survey history available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 