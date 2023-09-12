import "./app.scss";
import Header from './components/header/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <BrowserRouter basename='/movieapp'>
        <Header/>
          <Main />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;