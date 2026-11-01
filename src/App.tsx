import { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";

import Home from "./pages/home/home";
import About from "./pages/about/about";

function TitleUpdater() {

  const PAGE_TITLE: Readonly<Record<string, string>> = {
    "/": "What is a Kenneth Jake?",
    "/about": "Who is Kenneth Jake?",
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

function App() {

  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>

        <ScrollReset />
        <TitleUpdater />
        {/* <ScrollToTop /> */}

        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/about" element={<About />} />
        </Routes>   

      </BrowserRouter>
  )
}

export default App
