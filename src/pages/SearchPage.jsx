import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";
import { useTransition, animated } from "react-spring";

export default function SearchPage() {
  const { accessToken } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track,artist,album`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((response) => response.json())
        .then((data) => setResults(data));
    }
  };

  const transitions = useTransition(results.tracks?.items, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    delay: 200,
  });

  return (
    <section className="bg-neutral-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 w-[900px]">
        <h1 className="text-4xl font-bold mb-8">Search Spotify</h1>
        <div className="flex flex-row justify-between w-full mb-8">
          <input
            className="flex-grow mr-4 bg-neutral-800 text-white border-none rounded-md px-4 py-2 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="text-zinc-200 bg-spotify hover:bg-spotifyDark ease-in duration-200 px-5 py-3 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div
                style={styles}
                key={item.id}
                className="flex items-center space-x-4 mb-8"
              >
                <img
                  src={item.album.images[0]?.url}
                  alt={item.name}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-xl font-bold">{item.name}</p>
                  <p className="text-sm text-neutral-500">
                    {item.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </animated.div>
            )
        )}
      </div>
    </section>
  );
}
