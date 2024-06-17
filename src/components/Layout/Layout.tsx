import { Outlet } from "react-router-dom";
import { Translation } from "react-i18next";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    setTheme(userTheme);
  }, [userTheme]);

  return (
    <div className={`App w-full ${theme}`}>
      <Translation>{(t) => <Header t={t}> </Header>}</Translation>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
