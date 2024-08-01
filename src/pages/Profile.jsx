import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";
import LoginPrompt from "../components/LoginPrompt";
import { useSpring, animated } from "react-spring";

const Profile = () => {
  const { accessToken } = useContext(AuthContext);
  const [profileInfo, setProfile] = useState(null);

  useEffect(() => {
    if (accessToken) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((data) => setProfile(data));
    }
  }, [accessToken]);

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

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
        {profileInfo && (
          <animated.div
            style={props}
            className="flex flex-col items-center justify-center bg-neutral-800 w-full p-8 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <img
              className="w-32 h-32 rounded-full mb-5 hover:scale-105 transition-transform duration-200"
              src={profileInfo.images[1]?.url}
              alt={profileInfo.display_name}
            />
            <h2 className="text-3xl font-bold mb-2">
              {profileInfo.display_name}
            </h2>
            <p className="text-lg text-neutral-500 mb-2">
              Email: {profileInfo.email}
            </p>
            <p className="text-lg text-neutral-500 mb-2">
              Spotify Profile Link: {profileInfo.external_urls.spotify}
            </p>
            <p className="text-lg text-neutral-500 mb-2">
              Followers: {profileInfo.followers.total}
            </p>
            <p className="text-lg text-neutral-500 mb-2">
              Country: {profileInfo.country}
            </p>
            <p className="text-lg text-neutral-500 mb-2">
              Subscription Type: {profileInfo.product}
            </p>
          </animated.div>
        )}
      </div>
    </section>
  );
};

export default Profile;
