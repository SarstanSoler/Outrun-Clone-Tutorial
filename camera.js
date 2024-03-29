class Camera {
  constructor(scene) {
    //reference to the main scene
    this.scene = scene;

    //camera world coordinates
    this.x = 0;
    this.y = 1000;
    this.z = 0;

    //Z-distance between camera and player
    this.distToPlayer = 500;
    //Z-distance between the camera and normalized projection plane
    this.distToPlane = null;

  }

  //Initialize camera (must be called when initializing game or changing settings)
  //____________
  init() {
    this.distToPlane = 1 / (this.y / this.distToPlayer);
  }

  //Updates camera position.
  update() {
    //references
    var player = this.scene.player;
    var circuit = this.scene.circuit;
    
    //since player X is normalized within [-1, 1], then the camera X must be multiplied by road width
    this.x = player.x * circuit.roadWidth;
    
    //Place the camera to follow behind the player
    this.z = player.z - this.distToPlayer;

    //don't let camera Z go negative
    if (this.z<0) this.z += circuit.roadLength;
  }
}