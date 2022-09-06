import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main_home from './Components/Main_home/Main_home';
import Pool from './Components/Pool/Pool';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Main_home />
      <Pool />
      <Footer />

    </div>
  );
}

export default App;
