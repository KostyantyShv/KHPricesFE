import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequreAuth from "./components/Auth/RequireAuth";
import Layout from "./components/Layout/Layout";
import { SignUp } from "./pages/singup/SignUp";
import SignIn from "./pages/signin/SignIn";
import { NotFound } from "./pages/errors/NotFound";
import { ServerError } from "./pages/errors/ServerError";
import MyProfile from "./pages/MyProfile/MyProfile";
import SearchPrices from "./pages/SearchPrices/SearchPrices";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  // 1 = User, 2 = Admin
  const allovedRoles = [1, 2];
  if (!localStorage.getItem("autorized")) {
    localStorage.setItem("autorized", JSON.stringify({ currentUser: "guest" }));
  }

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
            <Route path="/500" element={<ServerError />}></Route>
              <Route
                path="/"
                element={
                  <MainPage/>
                }
              ></Route>
            <Route element={<RequreAuth allowedRoles={allovedRoles} />}>
              <Route path="/my-profile" element={<MyProfile />}></Route>
              <Route path="/search-prices" element={<SearchPrices />}></Route>
            </Route>
            <Route element={<RequreAuth allowedRoles={[2]} />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
