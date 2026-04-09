import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import GlassCard from "../components/GlassCard";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data) => api.post('/auth/signup', data),
    onSuccess: () => {
      navigate('/sign-in');
    },
    onError: (err) => {
      // Keep existing alert logic just in case
      if (err.message.includes("User already exists")) {
        alert("User already exists. Please login instead.");
      }
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-beige-primary">
      <GlassCard className="p-8 max-w-md w-full animate-fade-in" hover={false}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Join Us</h1>
          <p className="text-slate-500 font-medium">Create your account to start exploring</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="modern-input w-full"
              id="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="modern-input w-full"
              id="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="modern-input w-full"
              id="password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={isPending}
            className="modern-btn w-full py-4 rounded-2xl font-bold text-lg shadow-lg"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="text-xs font-bold text-slate-400 uppercase">Or join with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <OAuth />
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-slate-600 text-sm">
            Already have an account?
            <Link to="/sign-in">
              <span className="text-purple-600 font-bold hover:underline ml-1">Sign In</span>
            </Link>
          </p>
        </div>

        {isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-red-500 text-sm font-medium text-center">{error.message}</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
