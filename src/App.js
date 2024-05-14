import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=f514e5ddd4d77105772285b19e537b05&units=metric"
    )
      .then((result) => result.json())
      .then((jsonResult) => {
        setWeatherData(jsonResult);
        setLoading(false);
        if (jsonResult && jsonResult.coord) {
          setCoordinates({
            latitude: jsonResult.coord.lat,
            longitude: jsonResult.coord.lon
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const determineThemeClass = () => {
    if (!weatherData) return "";
    if (weatherData.main.temp <= 10) return "cold";
    if (weatherData.main.temp >= 25) return "hot";
    return "normal";
  };

  return (
    <div className={`App ${determineThemeClass()}`}>
      <div className="weather-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          weatherData && (
            <>
              <h2>Weather in {weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <div className="weather-info">
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            </>
          )
        )}
      </div>
      {/* Afficher le tableau des coordonnées */}
      {!loading && coordinates.latitude !== null && coordinates.longitude !== null && (
        <div className="coordinates-container">
          <h3>Coordinates</h3>
          <table>
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coordinates.latitude}</td>
                <td>{coordinates.longitude}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
