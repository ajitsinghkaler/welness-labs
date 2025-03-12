import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { AlertCircle, CheckCircle2, Clock, Send } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Survey {
  _id: string;
  question: string;
  response: string;
  submittedAt: string;
}

export default function Dashboard() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/surveys/response`, { response });
      setResponse('');
      setSuccess(true);
      fetchSurveys();
    } catch (err) {
      setError('Failed to submit response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Today's Survey Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Today's Pulse Survey</h1>
          <p className="text-muted-foreground text-lg">
            Your feedback shapes our workplace. Take a moment to share your thoughts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-foreground/90">{question}</h2>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Share your thoughts here..."
              className="min-h-[150px] resize-none text-base leading-relaxed focus-visible:ring-primary/30"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[200px] gap-2"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Response
                </>
              )}
            </Button>
            {error && (
              <div className="flex items-center gap-2 text-destructive animate-in fade-in">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-600 animate-in fade-in slide-in-from-right">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Thank you for your feedback!</span>
              </div>
            )}
          </div>
        </form>
      </section>

      {/* Previous Responses Section */}
      {surveys.length > 0 && (
        <section className="space-y-6 pt-6 border-t">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Your Previous Responses</h2>
            <p className="text-muted-foreground">Review your feedback history and track your contributions</p>
          </div>

          <div className="space-y-8">
            {surveys.map((survey) => (
              <div
                key={survey._id}
                className="relative pl-6 border-l-2 border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <time dateTime={survey.submittedAt} className="font-medium">
                    {new Date(survey.submittedAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="font-medium text-lg mb-2 text-foreground/90">{survey.question}</p>
                <p className="text-foreground/70 leading-relaxed">{survey.response}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 