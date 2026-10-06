import React, { useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

function Creator() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await apiRequest("get", "/users/admins");
        if (data && (data.admins || data.admin)) {
          setCreators(data.admins || data.admin);
        }
      } catch (err) {
        console.error("Failed to load creators", err);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Featured Creators & Editors
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              The writers and engineering leads behind BLOGerVoger
            </p>
          </div>
        </div>

        <Link
          to="/creators"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
        >
          <span>View All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {creators && creators.length > 0 ? (
          creators.slice(0, 4).map((element) => {
            return (
              <div
                key={element._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="relative mb-4">
                  <img
                    src={element.photo?.url || "/user.jpg"}
                    alt={element.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/30 group-hover:border-blue-500 shadow-md transition-colors"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {element.name}
                </h3>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                  {element.role}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {element.bio || "Contributing author and software specialist."}
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8 text-gray-400 text-sm">
            Featured creator profiles loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;
