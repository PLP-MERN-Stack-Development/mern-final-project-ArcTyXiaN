import React, { useState } from "react";
import { postJob } from "@/api/jobs";
import { useNavigate } from "react-router-dom";
import { Briefcase, Building2, MapPin, DollarSign, FileText, Calendar, Plus, Link as LinkIcon } from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    type: "full-time",
    registrationDeadline: "",
    verificationLink: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.location || !form.description || !form.registrationDeadline || !form.verificationLink) {
      setMessage("Please fill all required fields.");
      return;
    }

    const deadline = new Date(form.registrationDeadline);
    if (deadline < new Date()) {
      setMessage("Registration deadline must be in the future.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await postJob(form, token);
      setMessage("Job posted successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
            <Plus className="h-8 w-8 text-neutral-900" />
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">
            Post a New Job
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Find the perfect candidate for your team
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div className="bg-amber-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-neutral-900">Job Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Job Title */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Briefcase className="h-4 w-4 text-amber-500" />
                <span>Job Title *</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
            </div>

            {/* Company & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <Building2 className="h-4 w-4 text-amber-500" />
                  <span>Company *</span>
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span>Location *</span>
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g., Lagos, Nigeria"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                  required
                />
              </div>
            </div>

            {/* Job Type & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <Briefcase className="h-4 w-4 text-amber-500" />
                  <span>Job Type *</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span>Salary (₦)</span>
                </label>
                <input
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="e.g., 500000"
                  type="number"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                />
              </div>
            </div>

            {/* Registration Deadline */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span>Application Deadline *</span>
              </label>
              <input
                name="registrationDeadline"
                value={form.registrationDeadline}
                onChange={handleChange}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Choose the last date candidates can apply for this position
              </p>
            </div>

            {/* Verification/Application Link */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <LinkIcon className="h-4 w-4 text-amber-500" />
                <span>Application Link *</span>
              </label>
              <input
                name="verificationLink"
                value={form.verificationLink}
                onChange={handleChange}
                type="url"
                placeholder="e.g., https://forms.google.com/your-form"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Provide the link where candidates can apply (e.g., Google Form, company career page)
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <FileText className="h-4 w-4 text-amber-500" />
                <span>Job Description *</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all h-40 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg text-neutral-900 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                loading
                  ? "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </span>
              ) : (
                "Post Job"
              )}
            </button>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg text-center font-semibold ${
                  message.includes("success")
                    ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                    : "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
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

export default PostJob;
