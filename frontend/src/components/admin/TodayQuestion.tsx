import React, { useState } from "react";
import { useSetTodayQuestion } from "../../lib/queries";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const TodayQuestion: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const { mutate: setQuestion, isPending: settingQuestion } = useSetTodayQuestion();

  // Handle setting today's question
  const handleSetQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setQuestion(newQuestion);
      setNewQuestion('');
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
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