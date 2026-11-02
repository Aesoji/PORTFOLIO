import { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/home/home";
import About from "./pages/about/about";

import NavBar from "./components/navigationBar/navigationBar";
import BackgroundEffect from "./components/backgroundEffect/backgroundEffect";
import ProjectOverview from "./components/projectOverview/projectOverview";
import Menu from "./components/menu/menu";


function TitleUpdater() {
  
  const PAGE_TITLE: Readonly<Record<string, string>> = {
    "/": "KUNNIT",
    "/about": "About KUNNIT",
  }
  
  const { pathname } = useLocation();

  useEffect(() => {
    if (PAGE_TITLE[pathname]) {
      document.title = PAGE_TITLE[pathname];
    } else {
      document.title = "Kenneth's Portfolio";
    }
  }, [pathname]);

  return null;
}


function scrollToHashOrTop(hash: string): void {
  
  const targetId = decodeURIComponent(hash.slice(1));
  const target = targetId ? document.getElementById(targetId) : null;

  if (target) {
    target.scrollIntoView({ behavior: "instant", block: "start" });
    
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  
}


function ScrollReset() {
  
  const { pathname, hash } = useLocation();
  const hashRef = useRef(hash);
  hashRef.current = hash;

  useEffect(() => {

    if (!("scrollRestoration" in window.history)) 
      return undefined;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };

  }, []);

  useLayoutEffect(() => {
    scrollToHashOrTop(hashRef.current);
  }, [pathname]);

  return null;

}


export default function App() {

  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>

        <ScrollReset />
        <TitleUpdater />
        {/* <ScrollToTop /> */}

        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/about" element={<About />} />
          <Route path="/projects/:id" element={<ProjectOverview />} />
        </Routes>   

        <BackgroundEffect />
        <NavBar />
        <Menu />

      </BrowserRouter>
  )
}
