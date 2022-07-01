import Navbar from './Components/Navbar';
import Router from './routes/Router';
import './App.css';
import Notestate from './Context/Notes/Notestate';
import Alert from './Components/Alert';

function App() {
  return (
    <>
      <Notestate>
        <Navbar />
        <Alert />
        <div className="container">
          <Router />
        </div>
      </Notestate>
    </>
  );
}

export default App;
