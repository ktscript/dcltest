
class CoordSystem implements ISystem {
  entity: Entity
  constructor(entity: Entity) {
    this.entity = entity
  }

  update(): void {
    const p = Camera.instance.feetPosition
    const pr = room.getComponent(Transform)

    if (p.x >= pr.position.x - pr.scale.x/2 && p.x <= pr.position.x + pr.scale.x/2 && 
        p.z >= pr.position.z - pr.scale.z/2 && p.z <= pr.position.x + pr.scale.x/2 ){
      
      if ( !state2 ) { 
        clip.play()
        state2 = !state2
      }
    } else {

      if ( state2 ) {
        clip.stop()
        state2 = !state2
      }
    }
  }
}

let door = new Entity()
engine.addEntity(door)

door.addComponent(new GLTFShape("models/137098281Door.glb"))
door.addComponent(new Transform({ 
    position: new Vector3(6, 0, 2), 
    scale: new Vector3(1, 1, 1)
}))

door.addComponent(new Animator()).addClip(
  new AnimationState("Door1_open", {
    looping: false,
    speed: 1,
    layer: 0,
    weight: 0.5,
  }
))

let state = false
let state2 = false
let clip = door.getComponent(Animator).getClip('Door1_open')

door.addComponent(
  new OnClick(() => {
    state ? clip.stop() : clip.play()
    state = !state
  })
)

let room = new Entity()
room.addComponent(new GLTFShape("models/137098435box.glb"))
room.addComponent(new Transform({ 
    position: new Vector3(6, 0, 5), 
    scale: new Vector3(6, 3, 6)
}))
engine.addEntity(room)
engine.addSystem(new CoordSystem(room))
