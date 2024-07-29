import React from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useInfoContext } from "./context/Context";

import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Settings from "./pages/Settings/Settings";
import Contact from "./pages/Contact/Contact";
import Add from "./pages/Add/Add";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

const App = () => {
  const { currentUser } = useInfoContext();
  const location = useLocation();
  return (
    <div>
      <ToastContainer />

      {currentUser ? <Navbar /> : ""}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={400}>
          <Routes location={location}>
            <Route path="/" element={currentUser ? <Home /> : <Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={currentUser ? <Settings /> : <Auth/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add" element={currentUser ? <Add /> : <Auth/>} />
            <Route path="/category/:id" element={currentUser ? <CategoryPage /> : <Auth/>} />
          </Routes>

        </CSSTransition>
      </TransitionGroup>
          <section className="footer">
            <Footer/>
        </section>
    </div>
  );
};

export default App;
