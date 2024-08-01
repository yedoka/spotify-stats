import React from "react";
import { Link } from "react-router-dom";

export default function LoginPrompt() {
  return (
    <div className="flex flex-col justify-center items-center h-[800px]">
      <h1 className="text-2xl font-bold text-white">You need to log in</h1>
      <Link className="hover:underline" to="/spotify-clone">
        <button className="text-zinc-200 bg-spotify hover:bg-spotifyDark ease-in duration-200 px-5 py-3 rounded-md my-5">
          Home
        </button>
      </Link>
    </div>
  );
}
