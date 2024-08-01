import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { FaSpotify } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Navbar from "../components/Navbar";
import LoginPrompt from "../components/LoginPrompt";

export default function TopTracks() {
  const { accessToken } = useContext(AuthContext);
  const [topTracks, setTopTracks] = useState([]);
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
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((response) => response.json())
        .then((data) => setTopTracks(data.items));
    }
  }, [accessToken, timeRange]); // add timeRange to the dependency array

  if (!accessToken) {
    return (
      <>
        <Navbar />
        <LoginPrompt />
      </>
    );
  }

  return (
    <section className="bg-neutral-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 w-[900px]">
        <h1 className="text-4xl font-bold mb-8">Your Top Tracks</h1>
        <select
          className="mb-8 bg-neutral-800 text-white border-none rounded-md px-4 py-2 focus:outline-none"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="short_term">Last 4 weeks</option>
          <option value="medium_term">Last 6 months</option>
          <option value="long_term">All time</option>
        </select>
        <animated.div style={fadeIn}>
          {topTracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-xl font-bold">
                    {index + 1}. {track.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4"
              >
                <FaSpotify
                  className="hover:text-spotify ease-in duration-200"
                  size={32}
                />
              </a>
            </div>
          ))}
        </animated.div>
      </div>
    </section>
  );
}
