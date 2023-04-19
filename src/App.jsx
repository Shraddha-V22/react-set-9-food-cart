import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";
import MenuProvider from "./contexts/MenuContext";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
