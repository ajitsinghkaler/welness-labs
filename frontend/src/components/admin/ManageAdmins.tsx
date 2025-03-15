import React, { useState } from "react";
import {
  useAdminUsers,
  useAddAdminUser,
  useRemoveAdminUser,
} from "../../lib/queries";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";

// Define the AdminUser interface
interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const ManageAdmins: React.FC = () => {
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { data: adminUsers, isLoading, error } = useAdminUsers();
  const { mutate: addAdmin, isPending: addingAdmin } = useAddAdminUser();
  const { mutate: removeAdmin, isPending: removingAdmin } =
    useRemoveAdminUser();

  // Handle adding a new admin
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdmin.name && newAdmin.email && newAdmin.password) {
      addAdmin(newAdmin);
      setNewAdmin({ name: "", email: "", password: "" });
    }
  };

  // Handle removing an admin
  const handleRemoveAdmin = (userId: string) => {
    if (window.confirm("Are you sure you want to remove this admin?")) {
      removeAdmin(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        Loading admin users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive p-6">Failed to fetch admin users</div>
    );
  }

  return (
    <div className="space-y-10 mx-auto px-4 py-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Manage Admin Users
        </h1>
        <p className="text-muted-foreground mt-2">
          Add, view, and remove administrator accounts
        </p>
      </div>

      {/* Add New Admin Form */}
      <div className="pt-4 pb-8 border-b">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </span>
          Add New Admin
        </h2>
        <form onSubmit={handleAddAdmin} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                placeholder="Secure password"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={addingAdmin}
            variant="default"
            className="mt-4"
            loading={addingAdmin}
          >
            Add Admin
          </Button>
        </form>
      </div>

      {/* Admin Users List */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-secondary mr-2">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          Current Admin Users
        </h2>
        {adminUsers && adminUsers.length > 0 ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((admin: AdminUser) => (
                  <TableRow key={admin._id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary">
                        {admin.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleRemoveAdmin(admin._id)}
                        disabled={removingAdmin}
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <div className="mb-2 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            No admin users found
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAdmins;
