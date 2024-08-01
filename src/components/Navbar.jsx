import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center w-full h-[80px] border-b-2">
      <ul className="flex flex-row w-1/2 justify-around items-center text-white font-semibold">
        <li>
          <Link className="hover:underline" to="/spotify-clone/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/spotify-clone/toptracks">
            Top Tracks
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/spotify-clone/topartists">
            Top Artists
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/spotify-clone/recent">
            Recently Played
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/spotify-clone/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/spotify-clone/search">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
