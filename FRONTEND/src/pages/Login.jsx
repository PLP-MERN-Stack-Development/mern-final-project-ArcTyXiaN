import React, { useState } from 'react';
import { loginUser } from '@/api/jobs';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Briefcase } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('id', res.user.id);
      window.dispatchEvent(new Event('storage'));
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 100);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
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
            Welcome Back
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Sign in to continue to GOODWORK
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-200 dark:border-neutral-700">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Error Message */}
            {message && (
              <div className="p-4 bg-red-900 border border-red-700 rounded-lg">
                <p className="text-red-200 text-sm font-semibold text-center">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg text-neutral-900 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                loading 
                  ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed' 
                  : 'bg-amber-500 hover:bg-amber-600'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-amber-500 font-semibold hover:text-amber-600 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-600 dark:text-neutral-400 mt-6 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
