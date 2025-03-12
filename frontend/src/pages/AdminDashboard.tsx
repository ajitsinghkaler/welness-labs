import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

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

export default function AdminDashboard() {
  const { user } = useAuth();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<SurveyResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchResponses();
  }, []);

  useEffect(() => {
    filterResponses();
  }, [searchTerm, responses]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3001/surveys/admin/responses"
      );
      setResponses(res.data);
      setFilteredResponses(res.data);
    } catch (err) {
      setError("Failed to fetch responses");
    } finally {
      setLoading(false);
    }
  };

  const filterResponses = () => {
    if (!searchTerm) {
      setFilteredResponses(responses);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = responses.filter(
      (r) =>
        r.user.name.toLowerCase().includes(searchLower) ||
        r.user.email.toLowerCase().includes(searchLower) ||
        r.response.toLowerCase().includes(searchLower)
    );
    setFilteredResponses(filtered);
  };

  const handleExport = () => {
    const headers = ["Employee", "Email", "Question", "Response", "Date"];
    const csv = [
      headers.join(","),
      ...responses.map((r) =>
        [
          r.user.name,
          r.user.email,
          r.question,
          `"${r.response.replace(/"/g, '""')}"`,
          new Date(r.submittedAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `survey-responses-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = {
    totalResponses: responses.length,
  };

  if (user?.role !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom">
      {/* Stats Overview */}
      <div>
        <Card className="w-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResponses}</div>
          </CardContent>
        </Card>
      </div>

      {/* Responses Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Survey Responses</CardTitle>
              <CardDescription>
                View and analyze employee feedback
              </CardDescription>
            </div>
            <Button onClick={handleExport} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 text-destructive mb-4">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead className="max-w-[300px]">Response</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResponses.map((response) => (
                    <TableRow key={response._id}>
                      <TableCell className="font-medium">
                        {response.user.name}
                      </TableCell>
                      <TableCell>{response.user.email}</TableCell>
                      <TableCell>{response.question}</TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {response.response}
                      </TableCell>
                      <TableCell>
                        {new Date(response.submittedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredResponses.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No responses found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
