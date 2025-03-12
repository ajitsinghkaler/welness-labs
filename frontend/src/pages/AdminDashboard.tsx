import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SurveyResponse {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  question: string;
  response: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await axios.get('http://localhost:3001/surveys/admin/responses');
      setResponses(res.data);
    } catch (err) {
      setError('Failed to fetch responses');
    }
  };

  const handleExport = () => {
    const csv = responses.map(r => [
      r.userId.name,
      r.userId.email,
      r.question,
      r.response,
      new Date(r.submittedAt).toLocaleDateString()
    ].join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey-responses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (user?.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Survey Responses</CardTitle>
            <Button onClick={handleExport}>Export CSV</Button>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response._id}>
                    <TableCell>{response.userId.name}</TableCell>
                    <TableCell>{response.userId.email}</TableCell>
                    <TableCell>{response.question}</TableCell>
                    <TableCell>{response.response}</TableCell>
                    <TableCell>
                      {new Date(response.submittedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 