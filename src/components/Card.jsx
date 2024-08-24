import { useEffect, useState } from "react";
// import { ReactSkycon } from "react-skycons-extended";
import clearImg from "../images/clear.png";
import cloudyImg from "../images/cloudy.png";
import rainImg from "../images/rain.png";

const key = process.env.REACT_APP_API_KEY;

const weatherIcons = {
  Clear: clearImg,
  Clouds: cloudyImg,
  Rain: rainImg,
  Snow: rainImg,
  Thunderstorm: rainImg,
  Drizzle: rainImg,
  Mist: cloudyImg,
  Fog: cloudyImg,
};

export default function Card({ weather, setWeather, query, setQuery }) {
  const [error, setError] = useState(null);
  const date = new Date();
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const iconType = weather
    ? weatherIcons[weather.weather[0].main] || "public/images/clear.png"
    : "public/images/clear.png";

  console.log(iconType);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getWeather() {
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            query ? query : "cairo"
          }&appid=${key}&units=metric`,
          { signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setWeather(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(
            "Failed to fetch weather data. Please check your query and try again."
          );
        }
      }
    }

    getWeather();

    return () => {
      controller.abort();
    };
  }, [setWeather, query]);

  return (
    <div className="card">
      <div className="blur"></div>
      {error && <p>Error: {error}</p>}
      {weather && !error && (
        <>
          <img
            className="weather-icon"
            src={`${iconType}`}
            alt="weather status"
          />
          <div className="info-container">
            {/* <ReactSkycon
            className="icon"
            color={"white"}
            icon={iconType}
            size={100}
          /> */}

            <span>{weather.name}</span>
            <span>{weather.main.temp.toFixed()}°C</span>
            <p>wind speed: {weather.wind.speed} km</p>
            <p>
              {day}: {time}
            </p>
            <p>{weather.weather[0].main}</p>
          </div>
        </>
      )}
    </div>
  );
}
