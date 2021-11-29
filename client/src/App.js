import Stats from './components/stats';
import Footer from './components/footer';
import ScooterLogo from "../src/scooter512.png";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ScooterLogo} alt="logo of a scooter"/>
        <h1>Scootsafe</h1>
      </header>
      <main>
        < Stats />
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
}

export default App;
