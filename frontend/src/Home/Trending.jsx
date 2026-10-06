import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Flame } from "lucide-react";

function Trending() {
  const { blogs } = useAuth();
  const trendingBlogs = blogs?.slice(0, 8) || [];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="flex items-center space-x-2 mb-8">
        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
          <Flame size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Trending Across Topics
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Top reads and community favorites this week
          </p>
        </div>
      </div>

      {trendingBlogs.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4500}
          itemClass="px-2.5 pb-4"
        >
          {trendingBlogs.map((element) => {
            return (
              <div
                key={element._id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <Link to={`/blog/${element._id}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={element.blogImage?.url || "/code3.jpg"}
                      alt={element.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {element.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {element.title}
                    </h3>
                    <div className="flex items-center space-x-2 pt-3 border-t border-gray-100 dark:border-gray-700/60 mt-auto">
                      <img
                        src={element.adminPhoto || "/user.jpg"}
                        alt={element.adminName}
                        className="w-7 h-7 rounded-full object-cover border"
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                        {element.adminName}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div className="text-center py-12 text-gray-400 text-sm">
          No trending articles right now. Check back soon.
        </div>
      )}
    </div>
  );
}

export default Trending;
