import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Contact from "./pages/Profile";
import TopTracks from "./pages/TopTracks";
import Home from "./pages/Home";
import TopArtists from "./pages/TopArtists";
import Recent from "./pages/Recent";
import Layout from "./pages/Layout";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/spotify-clone" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="toptracks" element={<TopTracks />} />
            <Route path="topartists" element={<TopArtists />} />
            <Route path="recent" element={<Recent />} />
            <Route path="profile" element={<Contact />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
