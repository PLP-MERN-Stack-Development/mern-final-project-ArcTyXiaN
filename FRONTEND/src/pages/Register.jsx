import React, { useState } from "react";
import { registerUser } from "@/api/jobs";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Briefcase } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "jobseeker"
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await registerUser(form);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full shadow-lg mb-4">
            <Briefcase className="h-10 w-10 text-neutral-900" />
          </div>
          <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">
            Join GOODWORK
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Create your account and start your journey
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-200 dark:border-neutral-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <User className="h-4 w-4 text-amber-500" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Lock className="h-4 w-4 text-amber-500" />
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Briefcase className="h-4 w-4 text-amber-500" />
                <span>I am a</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "jobseeker" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    form.role === "jobseeker"
                      ? "border-amber-500 bg-neutral-50 dark:bg-neutral-900"
                      : "border-neutral-300 dark:border-neutral-700 hover:border-amber-500"
                  }`}
                >
                  <div className="text-center">
                    <User className={`h-6 w-6 mx-auto mb-2 ${
                      form.role === "jobseeker" ? "text-amber-500" : "text-neutral-500 dark:text-neutral-400"
                    }`} />
                    <p className={`font-semibold ${
                      form.role === "jobseeker" ? "text-amber-500" : "text-neutral-700 dark:text-neutral-100"
                    }`}>Job Seeker</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "employer" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    form.role === "employer"
                      ? "border-amber-500 bg-neutral-50 dark:bg-neutral-900"
                      : "border-neutral-300 dark:border-neutral-700 hover:border-amber-500"
                  }`}
                >
                  <div className="text-center">
                    <Briefcase className={`h-6 w-6 mx-auto mb-2 ${
                      form.role === "employer" ? "text-amber-500" : "text-neutral-500 dark:text-neutral-400"
                    }`} />
                    <p className={`font-semibold ${
                      form.role === "employer" ? "text-amber-500" : "text-neutral-700 dark:text-neutral-100"
                    }`}>Employer</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`p-4 rounded-lg border ${
                message.includes("successful")
                  ? "bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                  : "bg-red-100 border-red-300 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
              }`}>
                <p className="text-sm font-semibold text-center">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg text-neutral-900 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                loading
                  ? "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-500 font-semibold hover:text-amber-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-600 dark:text-neutral-400 mt-6 text-sm">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;
