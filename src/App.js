// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
// import confetti from 'canvas-confetti';

var counter = 0;
const kids = ["Jacob", "Hailey", "Ben", "Cora"];
var name = kids[counter];

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {/* <Route index element={<MainLayout />} /> */}
        <Route path="confirm" element={<Confirm />} />

      </Routes>
    </div>
  );
}

function MainLayout() {
  const navigate = useNavigate();

  return (
    <div>

      <header className="App-header" id="main-header">
        {/* <p>Testing .env: {process.env.REACT_APP_TESTING_ENV}</p> */}
        <p>
          It is currently
        </p>
        <div id="turn_name">
          <h1>
            {`${name}`}'s
          </h1>
        </div>
        <p>
          turn to unload the dishwasher
        </p>
        <button className="button_finished" onClick={(e) => {
          e.preventDefault();
          navigate("/confirm");
        }}>I finished unloading it!</button>
      </header>
    </div>
  );
}

function Confirm() {
  const navigate = useNavigate();

  return (
    <div>
      <div id="confirmation">
        <button className="button_finished" id="button_finished" onClick={(e) => {
          const button = document.querySelector('.button_finished');
          e.preventDefault();
          name = kids[((counter++) % 4)];
          console.log(name);
          button.classList.add('button_finished--clicked');
          document.querySelectorAll('span').forEach((element) => { element.classList.add('expanded') })

          setTimeout(() => { button.classList.remove("button_finished--clicked") }, 3500);
          setTimeout(() => { navigate("/") }, 3400);
          setTimeout(() => { document.getElementById("confirmation").remove() }, 1000);
          setTimeout(() => { document.querySelectorAll('span').forEach((element) => { element.classList.remove('expanded') }) }, 1700)

        }}><h2>{`${name}`} just finished unloading the dishwasher!</h2></button>
        <p>Not {`${name}`}? Select your name here: <select name="name-list" id="name-list" onChange={(e) => {
          console.log(e.target.value);
          name = e.target.value;
          let mainButton = document.getElementById("button_finished");
          for (let i = 0; i < kids.length; i++) {
            if (name == kids[i]) {
              counter = (i + 1) % 4;
              console.log("COUNTER: " + counter);
              break;
            }
          }

          mainButton.innerHTML = "<h2>" + name + " just finished unloading the dishwasher!</h2>";
        }}>
          {kids.map((kid) => kid == name ? <option key={kid} value={kid} selected>{kid}</option> : <option key={kid} value={kid}>{kid}</option>)}
        </select>
        </p>
      </div>
      <span className="color color--blue" data-value="1"></span>
      <span className="color color--orange" data-value="1"></span>
      <span className="color color--green" data-value="1"></span>
      <span className="color color--white" data-value="1"></span>

    </div>
  );
}

export default App;
