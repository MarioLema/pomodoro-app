import React, { Component } from 'react';
import './App.css';



//COUNTERS FOR SETINTERVALS
let counter, breakCounter;

//FUNCTION TO TRANSFORM SECONDS INTO TIME FORMAT STRING
  function timeFormat(num){
    return (
    num >= 600 ? 
      num % 60 >= 10 ? `${Math.floor(num/60)}:${num % 60}`  : 
                       `${Math.floor(num/60)}:0${num % 60}` :
      num % 60 >= 10 ? `0${Math.floor(num/60)}:${num % 60}` :
                       `0${Math.floor(num/60)}:0${num % 60}`)
  };
//=====================CLOCK CLASS CONTAINER=========================
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buzz: "",
      breaks: 5,
      breaksSeconds: 300,
      minutes: 25,
      minutesSeconds: 1500,
      timeDisplayed: "25:00",
      playing: false,
      session: "session",
      icon: "",
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
    if(this.state.minutesSeconds > 0){
        this.setState((prevState) => ({
          minutesSeconds: prevState.minutesSeconds - 1,
          timeDisplayed: timeFormat(prevState.minutesSeconds - 1)
        }));
    }else{
      clearInterval(counter);
      //stop buzzer
      this.setState( (prevState) => ({
        minutesSeconds: prevState.minutes * 60,
        session: 'break'
      }));
      breakCounter = setInterval(this.timerBreak, 1000);
    }
  }

  timerBreak() {
    if (this.state.breaksSeconds > 0) {
      this.setState((prevState) => ({
        breaksSeconds: prevState.breaksSeconds - 1,
        timeDisplayed: timeFormat(prevState.breaksSeconds - 1)
      }));
    } else {
      clearInterval(breakCounter);
      this.setState( (prevState) => ({
        breaksSeconds: prevState.breaks * 60,
        session: 'session'
      }));
      counter = setInterval(this.timer, 1000);
    }
  }

  //PLAY AND PAUSE METHODS TO SET INTERVALS
  startPlay(){
    this.setState(() => ({
      playing: true,
      icon: 'whatever to start'
    }));
    this.state.session === 'session' ? counter = setInterval(this.timer,1000) : breakCounter = setInterval(this.timerBreak,1000);
  }
  pausePlay(){
    this.setState(() => ({
      playing: false,
      icon: 'whatever to pause'
    }));
    this.state.session === 'session' ? clearInterval(counter) :  clearInterval(breakCounter);
  }



//TOGGLES BETWEEN PLAY AND PAUSE
  togglePlay() {
    this.state.playing === false ? this.startPlay() : this.pausePlay();
  }

  //HANDLE COUNTERS FOR BREAKS AND WORK MINUTES
  sessionIncrement() {
    if (this.state.minutes < 60) {
      this.setState((prevState) => ({
        minutes: prevState.minutes + 1
      }));
    }
  }

  sessionDecrement() {
    if (this.state.minutes > 1) {
      this.setState((prevState) => ({
        minutes: prevState.minutes - 1
      }));
    }
  }

  breakIncrement() {
    if (this.state.breaks < 60) {
      this.setState((prevState) => ({
        breaks: prevState.breaks + 1
      }));
    }
  }

  breakDecrement() {
    if (this.state.breaks > 1) {
      this.setState((prevState) => ({
        breaks: prevState.breaks - 1
      }));
    }
  }
  // RESETS TO ORIGINAL STATE
  resetState() {
    clearInterval(counter);
    clearInterval(breakCounter);
    //  buzz.pause();
    // buzz.currentTime = 0;
    this.setState( () => ({
      playing: false,
      active: false,
      breaks: 5,
      minutes: 25,
      minutesSeconds: 1500,
      breaksSeconds: 600,
      session: "session",
      icon: "icon HTML",
      timeDisplayed: '25:00'
    }));
  }

  render() {
    return (
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
          <i className="fas fa-play" />
        </div>
        <div className="bubble btn" id="reset" onClick={this.resetState}>
          <i className="fas fa-redo" />
        </div>

        <div className="background northWest" id="back1" />
        <div className="background east" id="back2" />
        <div className="background southEast" id="back3" />
        <div className="background southWest" id="back4" />
        <div className="background north" id="back5" />
        <div className="background west" id="back6" />
        <div className="background northWest" id="back7" />
        <div className="background east" id="back8" />
        <div className="background southEast" id="back9" />
        <div className="background south" id="back10" />
        <div className="background southWest" id="back11" />
        <div className="background south" id="back12" />
        <div className="background south" id="back13" />
        <div className="background southEast" id="back14" />
        <div className="background southEast" id="back15" />
        <div className="background northEast" id="back16" />
        <div className="background northWest" id="back17" />
        <div className="background north" id="back18" />
        <div className="background northWest" id="back19" />
        <div className="background west" id="back20" />
        <div className="background east" id="back21" />
        <div className="background northEast" id="back22" />
        <div className="background east" id="back23" />
        <div className="background north" id="back24" />
        <div className="background northEast" id="back25" />
        <div className="background north" id="back26" />
      </div>
    );
  }
}

export default Clock