import axios from "axios";
import { FormEvent, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import './App.css';

interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_speed: number;
    feelslike: number;
    humidity: number;
  };
};


const App: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '14101d1d8dedbdd8d1b229510360e9ea';

  const getWeather = async () => {

    try {
      const response = await axios.get(`https://api.weatherstack.com/current?access_key=${apiKey}`, {
        params: {
          query: city,
          units: 'f',
        }
        
      });
      console.log(response.data);
      setWeather(response.data);
      setError(null);

    }catch (error) {
      console.log(error);
      setError('An error occurred while fetching weather data.');
    };
  };
  
  const handleCitySearch = (event: FormEvent) => {
    event.preventDefault();

    if (city.trim()) {
      getWeather();
    }
  }
  


  return (


    <>
      <Container id="weather-container" className="d-flex text-white justify-content-center flex-column align-items-center text-center">
        <h1 className="weather-title">Weather App</h1>
        <Form>
          <input 
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="m-2 text-center"
          id="city-input"
          />
          <button id="city-btn" type="submit" onClick={handleCitySearch}>Search</button>
          {error && <p>{error}</p>}
          {weather && (
            <div>
              <Card className="mx-5 p-3" id="weather-card">
                <Card.Body>
                  <Card.Title className="text-white">{weather.location.name}, {weather.location.region}, {weather.location.country} </Card.Title>
                  <Card.Img 
                  src={weather.current.weather_icons[0]} 
                  alt="Weather Icon"
                  className="mx-auto d-block"
                  style={{ width: '150px', height: '150px' }} />
                  <Card.Text className="text-white">Temperature: {weather.current.temperature}°F</Card.Text>
                  <Card.Text className="text-white">Weather: {weather.current.weather_descriptions.join(', ')}</Card.Text>
                  <Card.Text className="text-white">Wind Speed: {weather.current.wind_speed} mph</Card.Text>
                  <Card.Text className="text-white">Feels Like: {weather.current.feelslike}°F</Card.Text>
                  <Card.Text className="text-white">Humidity: {weather.current.humidity}%</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}

        </Form>



      </Container>



    </>


  )


}

export default App
