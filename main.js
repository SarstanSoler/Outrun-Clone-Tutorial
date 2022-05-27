// Global Constants
//___________

//screen size
const SCREEN_W = 1920;
const SCREEN_H = 1080;

//coordinates of the screen center
const SCREEN_CX = SCREEN_W / 2;
const SCREEN_CY = SCREEN_H / 2;

//Game states
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

// Global variables
//_________

//current state
var state = STATE_INIT;

//Main scene
//________________

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  //Loads all assets
  preload() {
    this.load.image('skybg', '../assets/skybg.jpg');
  }

  //Creates all objects
  create() {
    //backgrounds
    this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, 'skybg');

    //instances
    this.circuit = new Circuit(this);
    this.camera = new Camera(this);
    this.settings = new Settings(this);
    
    //listener to pause game
    this.input.keyboard.on('keydown-P', function() {
      this.settings.txtPause.text = "[P] Resume";
      this.scene.pause();
      this.scene.launch('ScenePause');
    }, this);

    //listener to resume game
    this.events.on('resume', function() {
      this.settings.show();
    }, this);
  }

  //Main game loop
  update(time, delta) {
    switch (state) {
      case STATE_INIT:

        this.camera.init();
        
        state = STATE_RESTART;
        break;

      case STATE_RESTART:

        this.circuit.create();
        
        state = STATE_PLAY;
        break;

      case STATE_PLAY:

        this.camera.update();
        this.circuit.render3D();
        
        break;

      case STATE_GAMEOVER:
        break;
    }
  }
}

//Pause Screen
//_________

class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ScenePause' });
  }


  create() {
    //listener to resume game
    this.input.keyboard.on('keydown-P', function() {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }, this);
  }
}

//Initializing Phaser Game
//________________

//game configuration
var config = {
  type: Phaser.AUTO,
  width: SCREEN_W,
  height: SCREEN_H,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [MainScene, PauseScene]
};

//game instance
var game = new Phaser.Game(config);