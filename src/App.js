import "./App.css";
import Logo from "./components/Logo";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import { useState } from "react";
function App() {
  const [query, setQuery] = useState("cairo");
  const [weather, setWeather] = useState("");

  return (
    <>
      <Logo />
      <Hero />
      <SearchBar query={query} setQuery={setQuery} />
      <Card weather={weather} setWeather={setWeather} query={query} />
    </>
  );
}

export default App;
