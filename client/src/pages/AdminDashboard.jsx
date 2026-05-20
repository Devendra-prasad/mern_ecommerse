import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaHome, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalListings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/admin/metrics');
        const data = await res.json();
        if (data.totalUsers !== undefined) {
          setMetrics(data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl font-bold">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 mt-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
        <FaChartLine className="text-purple-600" /> Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-semibold mb-1">Total Users</p>
              <h2 className="text-5xl font-bold text-slate-800">{metrics.totalUsers}</h2>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaUsers className="text-4xl text-blue-600" />
            </div>
          </div>
          <Link to="/admin-users">
            <button className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Manage Users
            </button>
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-semibold mb-1">Total Properties</p>
              <h2 className="text-5xl font-bold text-slate-800">{metrics.totalListings}</h2>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <FaHome className="text-4xl text-purple-600" />
            </div>
          </div>
          <Link to="/admin-listings">
            <button className="mt-8 w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
              Manage Properties
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
