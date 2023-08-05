// import logo from './logo.svg';
import './App.css';
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
        <button class="button_finished" onClick={(e) => {
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
      <span class="color color--blue" data-value="1"></span>
      <span class="color color--orange" data-value="1"></span>
      <span class="color color--green" data-value="1"></span>
      <span class="color color--white" data-value="1">
      </span>
    </div>
  );
}

export default App;
