import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/products';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md">
            I
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create your Indicart Account</h1>
          <p className="text-xs text-slate-500 font-medium">
            Join Indicart for seamless shopping, order tracking, and exclusive discounts.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 text-sm bg-[#F8F7FC] border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20 transition text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 text-sm bg-[#F8F7FC] border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20 transition text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
              className="w-full px-4 py-2.5 text-sm bg-[#F8F7FC] border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20 transition text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
              className="w-full px-4 py-2.5 text-sm bg-[#F8F7FC] border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20 transition text-slate-900 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-purple-gradient py-3.5 px-6 rounded-full font-bold text-sm text-white shadow-md hover:shadow-lg transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
          Already registered?{' '}
          <Link to="/login" state={{ from: location.state?.from }} className="font-bold text-[#5B3DF5] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
