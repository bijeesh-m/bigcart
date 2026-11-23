
import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const UsersManagement = () => {



  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        console.log(data);

        setUsers(data.users)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Users Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage users, roles, and account permissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <Download size={17} />
              Export
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <UserPlus size={18} />
              Add User
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Users
              </p>
              <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 h-8 w-24 rounded-md bg-gray-100 text-2xl font-black" >
              {users.length}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              All registered users
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Active Users
              </p>
              <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 h-8 w-24 rounded-md bg-gray-100" />
            <p className="mt-2 text-xs text-gray-400">
              Currently active accounts
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Administrators
              </p>
              <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="mt-4 h-8 w-24 rounded-md bg-gray-100" />
            <p className="mt-2 text-xs text-gray-400">
              Users with admin access
            </p>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Users
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage registered users.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                <Filter size={16} className="text-gray-400" />
                <select
                  defaultValue=""
                  className="bg-transparent py-2.5 text-sm text-gray-600 outline-none"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <select
                defaultValue=""
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all users"
                      className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                    />
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    User
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Joined Date
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th className="px-6 py-4">
                        <input
                          type="checkbox"
                          aria-label="Select all users"
                          className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                        />
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        {user.name}
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        {user.role}
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        Active
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        Joined Date
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                <Users size={30} className="text-indigo-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No users found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                There are no users to display yet.
                Add your first user to get started.
              </p>

              <button
                type="button"
                className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <UserPlus size={18} />
                Add New User
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col justify-between gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-500">
              Showing 0 users
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                type="button"
                disabled
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
