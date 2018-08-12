import React, { Component } from "react";
import "./App.css";
import mp3_file from "./birds.mp3";
import play from "./play.png";
import pause from "./pause.png";
import redo from "./redo.png";

//COUNTERS FOR SETINTERVALS
let counter, breakCounter;

//FUNCTION TO TRANSFORM SECONDS INTO TIME FORMAT STRING
function timeFormat(num) {
  return num >= 600
    ? num % 60 >= 10
      ? `${Math.floor(num / 60)}:${num % 60}`
      : `${Math.floor(num / 60)}:0${num % 60}`
    : num % 60 >= 10
      ? `0${Math.floor(num / 60)}:${num % 60}`
      : `0${Math.floor(num / 60)}:0${num % 60}`;
}

//=====================CLOCK CLASS CONTAINER=========================
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buzz: new Audio(mp3_file),
      breaks: 5,
      breaksSeconds: 300,
      minutes: 25,
      minutesSeconds: 1500,
      timeDisplayed: "25:00",
      playing: false,
      session: "session",
      icon: play,
      active: false
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.startPlay = this.startPlay.bind(this);
    this.pausePlay = this.pausePlay.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.timer = this.timer.bind(this);
    this.timerBreak = this.timerBreak.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  // TIMER METHODS TO RUN THE INTERVALS
  timer() {
    if (this.state.minutesSeconds > 0) {
      this.setState(prevState => ({
        minutesSeconds: prevState.minutesSeconds - 1,
        timeDisplayed: timeFormat(prevState.minutesSeconds - 1)
      }));
    } else {
      clearInterval(counter);
      this.state.buzz.play();
      this.setState(prevState => ({
        minutesSeconds: prevState.minutes * 60,
        session: "break"
      }));
      breakCounter = setInterval(this.timerBreak, 1000);
    }
  }

  timerBreak() {
    if (this.state.breaksSeconds > 0) {
      this.setState(prevState => ({
        breaksSeconds: prevState.breaksSeconds - 1,
        timeDisplayed: timeFormat(prevState.breaksSeconds - 1)
      }));
    } else {
      clearInterval(breakCounter);
      this.state.buzz.play();
      this.setState(prevState => ({
        breaksSeconds: prevState.breaks * 60,
        session: "session"
      }));
      counter = setInterval(this.timer, 1000);
    }
  }

  //PLAY AND PAUSE METHODS TO SET INTERVALS
  startPlay() {
    if (!this.state.active) {
      this.setState(() => ({
        playing: true,
        icon: pause,
        active: true
      }));
    } else {
      this.setState(() => ({
        playing: true,
        icon: pause
      }));
    }
    this.state.session === "session"
      ? (counter = setInterval(this.timer, 1000))
      : (breakCounter = setInterval(this.timerBreak, 1000));
  }
  pausePlay() {
    this.setState(() => ({
      playing: false,
      icon: play
    }));
    this.state.session === "session"
      ? clearInterval(counter)
      : clearInterval(breakCounter);
  }

  //TOGGLES BETWEEN PLAY AND PAUSE
  togglePlay() {
    this.state.playing === false ? this.startPlay() : this.pausePlay();
  }

  //HANDLE COUNTERS FOR BREAKS AND WORK MINUTES
  sessionIncrement() {
    if (this.state.minutes < 60) {
      if (!this.state.active) {
        this.setState(prevState => ({
          minutes: prevState.minutes + 1,
          minutesSeconds: (prevState.minutes + 1) * 60,
          timeDisplayed: timeFormat((prevState.minutes + 1) * 60)
        }));
      } else {
        if (this.state.session === "break") {
          this.setState(prevState => ({
            minutes: prevState.minutes + 1,
            minutesSeconds: (prevState.minutes + 1) * 60
          }));
        } else {
          this.setState(prevState => ({
            minutes: prevState.minutes + 1
          }));
        }
      }
    }
  }
  sessionDecrement() {
    if (this.state.minutes > 1) {
      if (!this.state.active) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          minutesSeconds: (prevState.minutes - 1) * 60,
          timeDisplayed: timeFormat((prevState.minutes - 1) * 60)
        }));
      } else {
        if (this.state.session === "break") {
          this.setState(prevState => ({
            minutes: prevState.minutes - 1,
            minutesSeconds: (prevState.minutes - 1) * 60
          }));
        } else {
          this.setState(prevState => ({
            minutes: prevState.minutes - 1
          }));
        }
      }
    }
  }

  breakIncrement() {
    if (this.state.breaks < 60) {
      if (!this.state.active) {
        this.setState(prevState => ({
          breaks: prevState.breaks + 1,
          breaksSeconds: (prevState.breaks + 1) * 60,
          timeDisplayed: timeFormat((prevState.breaks + 1) * 60)
        }));
      } else {
        if (this.state.session === "session") {
          this.setState(prevState => ({
            breaks: prevState.breaks + 1,
            breaksSeconds: (prevState.breaks + 1) * 60
          }));
        } else {
          this.setState(prevState => ({
            breaks: prevState.breaks + 1
          }));
        }
      }
    }
  }

  breakDecrement() {
    if (this.state.breaks > 1) {
      if (!this.state.active) {
        this.setState(prevState => ({
          breaks: prevState.breaks - 1,
          breaksSeconds: (prevState.breaks - 1) * 60,
          timeDisplayed: timeFormat((prevState.breaks - 1) * 60)
        }));
      } else {
        if (this.state.session === "session") {
          this.setState(prevState => ({
            breaks: prevState.breaks - 1,
            breaksSeconds: (prevState.breaks - 1) * 60
          }));
        } else {
          this.setState(prevState => ({
            breaks: prevState.breaks - 1
          }));
        }
      }
    }
  }
  // RESETS TO ORIGINAL STATE
  resetState() {
    clearInterval(counter);
    clearInterval(breakCounter);
    //  buzz.pause();
    // buzz.currentTime = 0;
    this.setState(() => ({
      playing: false,
      active: false,
      breaks: 5,
      minutes: 25,
      minutesSeconds: 1500,
      breaksSeconds: 600,
      session: "session",
      icon: play,
      timeDisplayed: "25:00"
    }));
  }

  render() {
    return (
      <React.Fragment>
      <div id="pomodoro">
        <div className="bubble" id="break-label">
          Breaks
        </div>
        <div className="bubble" id="session-label">
          Min
        </div>
        <div
          className="bubble btn"
          id="session-increment"
          onClick={this.sessionIncrement}
        >
          +
        </div>
        <div
          className="bubble btn"
          id="session-decrement"
          onClick={this.sessionDecrement}
        >
          -
        </div>
        <div
          className="bubble btn"
          id="break-decrement"
          onClick={this.breakDecrement}
        >
          -
        </div>
        <div
          className="bubble btn"
          id="break-increment"
          onClick={this.breakIncrement}
        >
          +
        </div>
        <div className="bubble" id="break-length">
          {this.state.breaks}
        </div>
        <div className="bubble" id="session-length">
          {this.state.minutes}
        </div>
        <div className="bubble" id="timer-label">
          {this.state.session}
        </div>
        <div className="bubble" id="time-left">
          {this.state.timeDisplayed}
        </div>
        <div className="bubble btn" id="start_stop" onClick={this.togglePlay}>
          <img src={this.state.icon} className="icon" alt='play/pause'/>
        </div>
        <div className="bubble btn" id="reset" onClick={this.resetState}>
          <img src={redo} className="icon" alt='reverse'/>
        </div>
      </div>
      <Background />
      </React.Fragment>
    );
  }
}

let colors = [
  'rgba(217, 221, 146, 0.7)',
  'rgba(102, 161, 130, 0.5)',
  'rgba(174, 247, 142, 0.6)',
  'rgba(68, 118, 4, 0.4)',
  'rgba(238, 198, 67, 0.4)',
  'rgba(217, 229, 214, 0.4)',
]

class Background extends Component{
  creator(){
    let baubles = [];
    for(let i = 1; i < 70; i++){
      let radius = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
      let style = {
        background: colors[Math.floor(Math.random() * 7)],
        width: radius,
        height: radius,
        left: Math.floor(Math.random() * (90 - (-30) + 1)) + (-30) + '%',
        top:  Math.floor(Math.random() * (90 - (-30) + 1)) + (-30) + '%',
        animation: `${Math.floor(Math.random() * (60 - 46) + 1 ) + 46}s linear 0s infinite alternate floating${Math.ceil(Math.random() * 8)}`
      }
      baubles.push(<div className='backgroundBauble' style={style} key={'bauble' + i}></div>);
    }
    return baubles;
  }

  render(){
    return (
      <div>
      {this.creator()}
      </div>
    )

}
}

export default Clock;
