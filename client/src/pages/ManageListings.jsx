import { useEffect, useState } from "react";
import { FaTrash, FaBuilding, FaCheck } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function ManageListings() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialTab = urlParams.get('tab') || 'verified';

  const [listings, setListings] = useState([]);
  const [totalListings, setTotalListings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/listings?limit=9&status=${activeTab}`);
        const data = await res.json();
        if (data.listings) {
          setListings(data.listings);
          setTotalListings(data.totalListings);
          if (data.listings.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [activeTab]);

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    try {
      const res = await fetch(`/api/admin/listings?startIndex=${startIndex}&limit=9&status=${activeTab}`);
      const data = await res.json();
      if (data.listings) {
        setListings([...listings, ...data.listings]);
        if (data.listings.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching more listings:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property listing?")) return;
    try {
      const res = await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setListings(listings.filter(listing => listing._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/admin/listings/${id}/approve`, { method: 'PATCH' });
      const data = await res.json();
      if (res.ok) {
        setListings(listings.filter(listing => listing._id !== id));
        setTotalListings(prev => prev - 1);
        alert("Listing approved successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 mt-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <FaBuilding className="text-purple-600" /> Manage Properties
        {totalListings > 0 && (
          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full ml-2 border border-purple-200">
            Total: {totalListings}
          </span>
        )}
      </h1>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('verified')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'verified' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
        >
          Verified Properties
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'pending' ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
        >
          Pending Approvals
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading properties...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Owner Email</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing._id} className="hover:bg-slate-50 border-b last:border-0 transition-colors">
                  <td className="p-4">
                    <img src={listing.imageUrls[0]} alt="property" className="w-16 h-12 rounded object-cover" />
                  </td>
                  <td className="p-4 font-semibold text-slate-700">
                    <Link to={`/listing/${listing._id}`} className="hover:underline hover:text-purple-600">
                      {listing.name}
                    </Link>
                  </td>
                  <td className="p-4 text-slate-500">
                    ${listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {listing.userRef?.email || 'Unknown'}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {activeTab === 'pending' && (
                        <button 
                          onClick={() => handleApprove(listing._id)}
                          className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-full transition-all"
                          title="Approve Property"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(listing._id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all"
                        title={activeTab === 'pending' ? 'Reject Property' : 'Delete Property'}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
            className="text-purple-700 font-semibold hover:underline bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
          >
            Show More Properties
          </button>
        </div>
      )}
    </div>
  );
}
