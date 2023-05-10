import React from 'react';
import './App.css';
import Map from './components/Map';
import Trip from './pages/Trip';

interface AppProps {
  lng: number;
  lat: number;
}

function App({lng, lat}: AppProps) {

  return (
    <div className="App">
      <header className="App-header">
        <p>Oh you bet it's workin!</p>
        <Map center={[lng, lat]} zoom={10} />
        <Trip text={"some text"} />
      </header>
    </div>
  );
}

export default App;
