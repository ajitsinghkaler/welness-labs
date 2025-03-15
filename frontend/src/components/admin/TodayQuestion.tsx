import React, { useState } from "react";
import { useSetTodayQuestion } from "../../lib/queries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, AlertCircle, CheckCircle2 } from "lucide-react";

const TodayQuestion: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { mutate: setQuestion, isPending: settingQuestion } = useSetTodayQuestion();

  // Handle setting today's question
  const handleSetQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newQuestion.trim()) {
      setQuestion(newQuestion, {
        onSuccess: () => {
          setNewQuestion('');
          setSuccess("Today's question has been set successfully!");
          setTimeout(() => setSuccess(''), 3000);
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Failed to set today's question");
        },
      });
    }
  };

  return (
    <div className="space-y-10 mx-auto px-4 py-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Set Today's Question</h1>
        <p className="text-muted-foreground mt-2">
          Create a new survey question for employees to answer today
        </p>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-primary mr-2">
            <Edit size={20} />
          </span>
          Question Form
        </h2>
        <form onSubmit={handleSetQuestion} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter today's survey question..."
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            disabled={settingQuestion}
            className="mt-4"
            loading={settingQuestion}
          >
            {settingQuestion ? 'Setting Question...' : 'Set Question'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TodayQuestion; 