import { useEffect, useState } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users?limit=9');
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          if (data.users.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onShowMoreClick = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/admin/users?startIndex=${startIndex}&limit=9`);
      const data = await res.json();
      if (data.users) {
        setUsers([...users, ...data.users]);
        if (data.users.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching more users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This will also delete all their listings.")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter(user => user._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 mt-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <FaUserShield className="text-blue-600" /> Manage Users
        {totalUsers > 0 && (
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-2 border border-blue-200">
            Total: {totalUsers}
          </span>
        )}
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-4 border-b">Avatar</th>
                <th className="p-4 border-b">Username</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 border-b last:border-0 transition-colors">
                  <td className="p-4">
                    <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{user.username}</td>
                  <td className="p-4 text-slate-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showMore && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={onShowMoreClick}
            className="text-blue-700 font-semibold hover:underline bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
          >
            Show More Users
          </button>
        </div>
      )}
    </div>
  );
}
