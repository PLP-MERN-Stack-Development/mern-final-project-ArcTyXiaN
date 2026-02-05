import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "@/api/jobs";
import JobCard from "@/components/JobCard";
import { Link } from "react-router-dom";
import { Search, Filter, Briefcase, TrendingUp, Edit, Trash2, Loader } from "lucide-react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      if (Array.isArray(data)) {
        setJobs(data);
        setFilteredJobs(data);
      } else {
        setJobs([]);
        setFilteredJobs([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((job) => job.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((job) => {
        const isExpired = new Date() > new Date(job.registrationDeadline);
        return filterStatus === "open" ? !isExpired : isExpired;
      });
    }

    setFilteredJobs(filtered);
  }, [searchTerm, filterType, filterStatus, jobs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id, token);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || "Error deleting job");
    }
  };

  const stats = {
    total: jobs.length,
    open: jobs.filter((job) => new Date() <= new Date(job.registrationDeadline)).length,
    expired: jobs.filter((job) => new Date() > new Date(job.registrationDeadline)).length,
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Connect with top employers and discover amazing opportunities
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.total}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Jobs</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.open}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Open Positions</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <Filter className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{filteredJobs.length}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Filtered Results</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
              />
            </div>

            {/* Job Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {loading ? (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader className="h-12 w-12 text-amber-500 animate-spin mb-4" />
      <p className="text-neutral-600 dark:text-neutral-400 text-lg">Loading amazing jobs...</p>
    </div>
  ) : error ? (
    <div className="text-center py-20">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  ) : filteredJobs.length === 0 ? (
    <div className="text-center py-20">
      <Briefcase className="h-20 w-20 text-neutral-400 mx-auto mb-4" />
      <p className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-2">No jobs found</p>
      <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your search or filters</p>
    </div>
  ) : (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {filteredJobs.map((job) => (
        <div key={job._id} className="relative">
          <JobCard job={job} />

          {/* Employer Controls */}
          {userRole === "employer" && job.employerId?._id === userId && (
            <div className="flex justify-end gap-2 mt-3">
              <Link
                to={`/edit-job/${job._id}`}
                className="flex items-center space-x-1 px-4 py-2 bg-amber-500 text-neutral-900 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>

              <button
                className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-neutral-100 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold"
                onClick={() => handleDelete(job._id)}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default Home;
