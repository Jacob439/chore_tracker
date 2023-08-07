// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
// import confetti from 'canvas-confetti';

function App() {
  // TEMP ARRAY:
  let counter = 0;
  const kids = ["Jacob", "Hailey", "Ben", "Cora"];
  let name = kids[counter];
  // document.getElementById("button_finished").addEventListener("click", function () { console.log("HI"); });
  return (
    <div className="App">
      <header className="App-header">
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
      <Routes>
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

function Test() {
  return (
    <p>Yay, this worked</p>
  )
}

export default App;
