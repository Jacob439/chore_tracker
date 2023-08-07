// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import confetti from 'canvas-confetti';

var counter = 0;
const kids = ["Jacob", "Hailey", "Ben", "Cora"];
var name = kids[counter];

function App() {
  // TEMP ARRAY:

  // document.getElementById("button_finished").addEventListener("click", function () { console.log("HI"); });
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
function Test() {
  return (
    <div></div>
  )
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
          const button = document.querySelector('.button_finished');
          e.preventDefault();
          button.classList.add('button_finished--clicked');
          document.querySelectorAll('span').forEach((element) => { element.classList.add('expanded') })
          /* 
      ---------------------------------------
      just to reset without having to refresh..
       --------------------------------*/
          setTimeout(() => { button.classList.remove("button_finished--clicked") }, 3500);
          // Now insert new page here
          // and REMOVE BELOW LINE
          // window.location.href = "/test";
          // setTimeout(() => { window.location.href = "/test" }, 3400);
          setTimeout(() => { navigate("/confirm") }, 3400);
          // <Link to="/confirm">confirm</Link>;
          // const app_header = document.getElementsByClassName("App-header");
          setTimeout(() => { document.getElementById("main-header").remove() }, 1000);
          setTimeout(() => { document.querySelectorAll('span').forEach((element) => { element.classList.remove('expanded') }) }, 1700)
          // name = kids[((counter++) % 4)];
          // console.log(name);
          // confetti();
          // document.getElementById("turn_name").innerHTML = "<h1>" + name + "'s";
        }}>I finished unloading it!</button>
      </header>
      <span className="color color--blue" data-value="1"></span>
      <span className="color color--orange" data-value="1"></span>
      <span className="color color--green" data-value="1"></span>
      <span className="color color--white" data-value="1"></span>
      {/* <span className="color color--back" data-value="1"></span> */}
    </div>
  );
}

function Confirm() {
  const navigate = useNavigate();
  return (
    <div>
      <button id="submit_name" onClick={(e) => {
        name = kids[((counter++) % 4)];
        console.log(name);
        confetti();
        // setTimeout(() => { window.location.href = "/" }, 3000);
        setTimeout(() => { navigate("/") }, 3000);
      }}>
        <h2>{`${name}`} just finished unloading the dishwasher!</h2>
      </button>
      <p>Not {`${name}`}? Select your name here: </p>
    </div>
  );
}

export default App;
