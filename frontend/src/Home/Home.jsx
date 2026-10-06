import React from "react";
import Hero from "./Hero";
import Trending from "./Trending";
import Devotional from "./Devotional";
import Creator from "./Creator";

function Home() {
  return (
    <div className="dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
}

export default Home;
