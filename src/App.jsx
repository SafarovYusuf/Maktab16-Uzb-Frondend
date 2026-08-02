import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteNavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Teachers from "./pages/Teachers";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <SiteNavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
