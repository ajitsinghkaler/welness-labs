import React, { useState } from 'react';
import { useCurrentSurvey, useSurveyHistory, useSubmitSurveyResponse } from '../lib/queries';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, PlusCircle, FileText } from 'lucide-react';

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
    return <div className="text-destructive p-6">{error}</div>;
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
              <h3 className="text-lg font-medium text-foreground/90">{currentQuestion.question}</h3>
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

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-secondary mr-2">
            <FileText size={20} />
          </span>
          Survey History
        </h2>
        {surveyHistory && surveyHistory.length > 0 ? (
          <div className="space-y-4">
            {surveyHistory.map((survey: Survey, index: number) => (
              <div key={index} className="border p-4 rounded shadow">
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