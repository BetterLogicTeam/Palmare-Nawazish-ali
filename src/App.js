import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main_home from './Components/Main_home/Main_home';
import Pool from './Components/Pool/Pool';
import Footer from './Components/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="App bgcolor">
      <Header />
      <Main_home />
      <Pool />
      <Footer />
      <ToastContainer />

    </div>
  );
}

export default App;
