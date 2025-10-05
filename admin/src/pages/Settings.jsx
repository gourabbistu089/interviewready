import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, User, Mail, Shield, CheckCircle, XCircle, Search, Users, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { deleteUser, getAllUsers } from "../api/api";

const UserSettings = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, filterRole, filterStatus]);

  const fetchUsers = async (page) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: usersPerPage.toString(),
      });

      if (filterRole) params.append('role', filterRole);
      if (filterStatus) params.append('isActive', filterStatus);

      const res = await getAllUsers(`?${params.toString()}`);
      
      setUsersData(res.users || []);
      setTotalPages(res.pagination?.pages || 1);
      setTotalUsers(res.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsersData(usersData.filter(user => user.id !== userId));
      setTotalUsers(prev => prev - 1);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredUsers = usersData.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (isLoading && usersData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1800px] mx-auto p-6 lg:p-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">User Management</h1>
              <p className="text-slate-600 text-lg">Manage and monitor all registered users</p>
            </div>
            
            {/* Stats Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-lg border border-slate-200"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-slate-900">{totalUsers}</p>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    User Profile
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Contact Information
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Performance
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Timeline
                  </th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id || user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* User Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff&size=200&bold=true`}
                            alt={user.fullName}
                            className="w-15 h-15 rounded-full object-cover border-2 border-slate-200"
                          />
                         
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{user.fullName}</p>
                          <p className="text-sm text-slate-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <div className="space-y-2 flex flex-col px-16">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          user.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          user.isVerified 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Shield className="w-3.5 h-3.5" />
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </td>

                    {/* Performance Stats */}
                    <td className="py-4 px-6">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                          <p className="text-xs text-blue-600 font-medium mb-0.5">Questions</p>
                          <p className="text-lg font-bold text-blue-900">{user.stats.questionsCompleted}</p>
                        </div>
                        <div className="bg-purple-50 px-3 py-2 rounded-lg border border-purple-100">
                          <p className="text-xs text-purple-600 font-medium mb-0.5">Interviews</p>
                          <p className="text-lg font-bold text-purple-900">{user.stats.mockInterviews}</p>
                        </div>
                        <div className="bg-pink-50 px-3 py-2 rounded-lg border border-pink-100">
                          <p className="text-xs text-pink-600 font-medium mb-0.5">Blogs</p>
                          <p className="text-lg font-bold text-pink-900">{user.stats.blogsWritten}</p>
                        </div>
                        <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                          <p className="text-xs text-amber-600 font-medium mb-0.5">Modules</p>
                          <p className="text-lg font-bold text-amber-900">{user.stats.modulesCompleted}</p>
                        </div>
                      </div>
                    </td>

                    {/* Timeline */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="bg-slate-50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-slate-500 font-medium">Joined</p>
                          <p className="text-sm font-semibold text-slate-900">{formatDate(user.createdAt)}</p>
                        </div>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-slate-500 font-medium">Last Login</p>
                          <p className="text-sm font-semibold text-slate-900">{formatDate(user.lastLogin)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        {deleteConfirm === user.id ? (
                          <div className="flex flex-col gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteUser(user.id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              Confirm
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDeleteConfirm(user.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm border border-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-500">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-semibold text-slate-900">
                    {Math.min(indexOfLastUser, totalUsers)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-900">{totalUsers}</span> users
                </p>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2.5 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 shadow-sm'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  <div className="flex items-center gap-1">
                    {renderPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">
                          ...
                        </span>
                      ) : (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] h-[40px] rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                          }`}
                        >
                          {page}
                        </motion.button>
                      )
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2.5 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 shadow-sm'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserSettings;