import React, { useEffect, useState } from "react";
import { getJobById, updateJob } from "@/api/jobs";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, Building2, MapPin, DollarSign, FileText, Calendar, Save, Loader, Link as LinkIcon } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    type: "full-time",
    registrationDeadline: "",
    verificationLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setForm({
        title: data.title,
        company: data.company,
        description: data.description,
        location: data.location,
        salary: data.salary || "",
        type: data.type || "full-time",
        registrationDeadline: data.registrationDeadline 
          ? new Date(data.registrationDeadline).toISOString().split('T')[0]
          : "",
        verificationLink: data.verificationLink || "",
      });
    } catch (err) {
      setMessage("Error loading job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.registrationDeadline) {
      setMessage("Please set an application deadline");
      return;
    }

    if (!form.verificationLink) {
      setMessage("Please provide an application link");
      return;
    }

    const deadline = new Date(form.registrationDeadline);
    if (deadline < new Date()) {
      setMessage("Registration deadline must be in the future.");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      await updateJob(id, form, token);
      setMessage("Job updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error updating job");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-neutral-400 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4">
            <Save className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-neutral-100 mb-2">
            Edit Job
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-400">
            Update your job posting details
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Job Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Job Title */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                <Briefcase className="h-4 w-4 text-amber-600" />
                <span>Job Title *</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                required
              />
            </div>

            {/* Company & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span>Company *</span>
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  <span>Location *</span>
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                  required
                />
              </div>
            </div>

            {/* Job Type & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                  <Briefcase className="h-4 w-4 text-amber-600" />
                  <span>Job Type *</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                  <span>Salary (₦)</span>
                </label>
                <input
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Registration Deadline */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span>Application Deadline *</span>
              </label>
              <input
                name="registrationDeadline"
                value={form.registrationDeadline}
                onChange={handleChange}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                required
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-neutral-400">
                Choose the last date candidates can apply for this position
              </p>
            </div>

            {/* Verification/Application Link */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                <LinkIcon className="h-4 w-4 text-amber-600" />
                <span>Application Link *</span>
              </label>
              <input
                name="verificationLink"
                value={form.verificationLink}
                onChange={handleChange}
                type="url"
                placeholder="e.g., https://forms.google.com/your-form or https://company.com/apply"
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100"
                required
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-neutral-400">
                Provide the link where candidates can apply or submit their application
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-neutral-100 mb-2">
                <FileText className="h-4 w-4 text-amber-600" />
                <span>Job Description *</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all dark:bg-neutral-900 dark:text-neutral-100 h-40 resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 py-4 px-6 rounded-lg bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 font-bold text-lg hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 py-4 px-6 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  updating
                    ? "bg-gray-400 dark:bg-neutral-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                }`}
              >
                {updating ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </span>
                ) : (
                  "Update Job"
                )}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg text-center font-semibold ${
                  message.includes("success")
                    ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                    : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
