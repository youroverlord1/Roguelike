// //key binding for input handling
import {DATASTORE} from './datastore.js'
import {Message} from './message.js'

class keyBinder {
  constructor(Game){
    this.Game = Game;
  }
}
export class StartupInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup') {
      console.dir(this);
      console.log(this.Game);
      this.Game.switchMode('story');
      return true;
    }
  }
}
export class PlayInput extends keyBinder{
  handleInput(eventType, evt){
    if (eventType == 'keyup') {
      if (evt.key == "l") {
        this.Game.switchMode('level');
        return true;
      }
      if (evt.key == "m") {
        this.Game.switchMode('cache');
        return true;
      }
      if (evt.key == "Escape") {
        this.Game.switchMode('persistence');
        return true;
      }
      if (evt.key == "w" || evt.key == "s" || evt.key == "a" || evt.key == "d" || evt.key == "r" || evt.key == "t" || evt.key == "z" || evt.key == "x") {
        return evt.key;
      }
    }
  }
}

export class EndInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup' && evt.key == "r") {
      this.Game.switchMode('startup');
      return true;
    }
  }
}

export class HCInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup' && evt.key == "Escape") {
      this.Game.switchMode('play');
      return true;
    }
  }
}

export class PersistenceInput extends keyBinder {
  handleInput(eventType, evt){
    if (eventType == 'keyup') {
      if (evt.key=="n" || evt.key == "N"){
        this.Game.setupNewGame();
        this.Game.switchMode('level');
        return(true);
      }
      if (evt.key=="s" || evt.key=="S" || evt.key== "l" || evt.key=="L"){
        return evt.key;
      }
      if (evt.key == "Escape") {
        this.Game.switchMode('play');
        return(true);
      }
      return false;
    }
  }
}
export class LevelInput extends keyBinder{
  handleInput(eventType, evt){
    if (eventType == 'keyup') {
      if(evt.key == "Escape") {
        this.Game.switchMode('play');
        return true;
      }
      if (evt.key == "1" || evt.key == "2" || evt.key == "3" || evt.key == "4") {
        return evt.key;
      }
    }
  }
}
export class StoryInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup') {
      this.Game.switchMode('control');
      return true;
    }
  }
}
export class ControlInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup') {
      this.Game.switchMode('persistence');
      return true;
    }
  }
}
export class AimInput extends keyBinder {
  handleInput(eventType, evt) {
    if (eventType == 'keyup') {
      if (evt.key == "Escape") {
        this.Game.switchMode('play');
        return true;
      }
    }
    if (eventType == 'keyup') {
      if (evt.key == "1" || evt.key == "2" || evt.key == "3" || evt.key == "4") {
        Message.send("Choose a direction to aim your attack with wsad")
        return evt.key;
      }
    }
  }
}
