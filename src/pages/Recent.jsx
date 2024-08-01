import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { FaSpotify } from "react-icons/fa";
import Navbar from "../components/Navbar";
import LoginPrompt from "../components/LoginPrompt";
import { useSpring, animated } from "react-spring";

export default function Recent() {
  const { accessToken } = useContext(AuthContext);
  const [recentTracks, setRecentTracks] = useState([]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  useEffect(() => {
    if (accessToken) {
      fetch("https://api.spotify.com/v1/me/player/recently-played", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((data) => setRecentTracks(data.items));
    }
  }, [accessToken]);

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
        <h1 className="text-4xl font-bold mb-8">Your Recent Tracks</h1>
        <animated.div style={fadeIn}>
          {recentTracks.map((track, index) => (
            <div
              key={track.track.id}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={track.track.album.images[0]?.url}
                  alt={track.track.name}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-xl font-bold">
                    {index + 1}. {track.track.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {track.track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <a
                href={track.track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
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
