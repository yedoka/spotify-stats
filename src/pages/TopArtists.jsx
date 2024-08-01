import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";
import LoginPrompt from "../components/LoginPrompt";
import { useSpring, animated } from "react-spring";

const TopArtists = () => {
  const { accessToken } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("medium_term");

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  useEffect(() => {
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((response) => response.json())
        .then((data) => setTopArtists(data.items));
    }
  }, [accessToken, timeRange]);

  if (!accessToken) {
    return (
      <>
        <Navbar />
        <LoginPrompt />
      </>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-white text-4xl font-bold my-5">Top Artists</h1>
        <select
          className="mb-5 bg-neutral-800 text-white border-none rounded-md px-4 py-2 focus:outline-none"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="short_term">Last 4 weeks</option>
          <option value="medium_term">Last 6 months</option>
          <option value="long_term">All time</option>
        </select>
        <animated.div
          style={fadeIn}
          className="grid grid-cols-3 gap-16 w-[1100px]"
        >
          {topArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="text-white flex flex-col items-center"
            >
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="cover object-cover w-56 h-56 rounded-full"
              />
              <h2 className="mt-5 font-semibold">
                {index + 1}. {artist.name}
              </h2>
            </div>
          ))}
        </animated.div>
      </div>
    </section>
  );
};

export default TopArtists;
