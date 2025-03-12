import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Survey {
  _id: string;
  question: string;
  response: string;
  submittedAt: string;
}

interface SurveyResponse {
    id: string;
    userId: string;
    surveyId: string;
    response: string;
    createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    fetchQuestion();
    fetchSurveys();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`${API_URL}/surveys`);
      setQuestion(res.data.question);
    } catch (err) {
      setError('Failed to fetch question');
    }
  };

  const fetchSurveys = async () => {
    try {
      const res = await axios.get(`${API_URL}/surveys/history`);
      setSurveys(res.data);
    } catch (err) {
      setError('Failed to fetch surveys');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/surveys/response`, { response });
      setResponse('');
      fetchSurveys();
    } catch (err) {
      setError('Failed to submit response');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">{question}</h3>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit">Submit Response</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Previous Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div key={survey._id} className="border-b pb-4">
                  <p className="font-medium">{survey.question}</p>
                  <p className="mt-2">{survey.response}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(survey.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 