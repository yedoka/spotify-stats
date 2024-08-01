import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

export default function SpotifyLogin() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const scopes =
      "user-read-private user-read-email user-top-read user-read-recently-played";
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_REDIRECT_URI
    )}`;

    window.location.href = url;
  };

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      setAccessToken(params.get("access_token"));
      setIsLoading(false);
    }
  }, [setAccessToken]);

  return (
    <section className="flex flex-col justify-center items-center w-full mt-5">
      <div className="flex flex-col justify-center items-center bg-neutral-700 p-5 rounded-md w-[800px] h-[300px]">
        <h1 className="text-white font-semibold text-3xl mb-5">
          Spotify Login Page
        </h1>
        <p className="text-white text-center">
          {accessToken
            ? "You logged in successfully"
            : "Log in with your Spotify account to see your top tracks and playlists."}
        </p>

        {accessToken ? (
          <button
            className="text-zinc-200 bg-spotify hover:bg-spotifyDark ease-in duration-200 px-5 py-3 rounded-md my-5"
            onClick={() => setAccessToken(null)}
          >
            Log out
          </button>
        ) : (
          <button
            className="text-zinc-200 bg-spotify hover:bg-spotifyDark ease-in duration-200 px-5 py-3 rounded-md my-5"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log in with Spotify"}
          </button>
        )}
      </div>
    </section>
  );
}
