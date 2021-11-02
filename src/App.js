import ScooterLogo from "../src/scooter512.png";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ScooterLogo} alt="logo of a scooter"/>
        <h2>Scooter stats</h2>
      </header>
      <main>
        <p>Main</p>
      </main>
      <footer>
      <p>footer</p>
      </footer>
    </div>
  );
}

export default App;
