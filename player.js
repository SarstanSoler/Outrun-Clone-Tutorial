class Player
  {
    constructor(scene){
      //reference to the main scene
      this.scene = scene;

      //reference to the player sprite
      this.sprite = scene.sprites[PLAYER];

      //player world coordinates
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = (this.sprite.width/1000)*2;

      //player screen coordinates
      this.screen = {x:0, y:0, w:0, h:0};
      
      //max speed avoids moving for more than 1 road segment per frame, assuming 60fps
      this.maxSpeed = (scene.circuit.segmentLength) / (1/60);

      //driving control parameters
      this.speed = 0;  //current speed
    }

    //Initialize player (must be called when initializing the game or changing settings)

    init(){
      //set the player screen size
      this.screen.w = this.sprite.width;
      this.screen.h = this.sprite.height;

      //set the player screen position
      this.screen.x = SCREEN_CX;
      this.screen.y = SCREEN_H - this.screen.h/2;
    }
    
    //restart player
    restart(){
      this.x = 0;
      this.y = 0;
      this.z = 0;

      this.speed = this.maxSpeed;
      
    }

    //updates player position
    update(dt){

      //reference to the scene objects
      var circuit = this.scene.circuit;
      
      //moving in Z direction
      this.z += this.speed* dt;
      if (this.z >= circuit.roadLength) this.z -= circuit.roadLength;
    }
  }