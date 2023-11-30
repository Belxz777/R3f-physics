import { Box, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { RigidBody,quat } from '@react-three/rapier'
import { Triangle } from "three";
import { Quaternion } from "three";
import { useState,useRef, useEffect } from "react"
import { Ring } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Controls } from "../App";
import * as THREE from 'three'
import { useKeyboardControls } from "@react-three/drei";
export const Experience = () => {
  const [clicked, setclicked] = useState(false)
  const sphreRef = useRef()
  const third = useRef()
  const sphere = useRef()
  const [move, setmove] = useState(0)
const [contol, setcontol] = useState(' ')
const heroRef = useRef()
const reloadPressed = useKeyboardControls((state) => state[Controls.reload]);
const leftPressed = useKeyboardControls((state) => state[Controls.left]);
const rightPressed = useKeyboardControls((state) => state[Controls.right]);
const backPressed = useKeyboardControls((state) => state[Controls.back]);
const [right, setright] = useState(true)
const ring = useRef()
const forwardPressed = useKeyboardControls(
  (state) => state[Controls.forward]
);
useEffect(() => {
  const timer = setInterval(() => {
    setright(!right);
  }, 500);
  
  // очистка интервала
  return () => clearInterval(timer);
});

const kicker = useRef()
useFrame((_state,delta)=>{
  if (sphreRef.current.position == ring.current.position){
console.log(`${sphreRef.current.position} на ${ring.current.position}`)
  }
  if(right){
    third.current.applyImpulse({x:2,y:0,z:0})
    ring.current.applyImpulse({x:0,y:2,z:0})
  }
  else{
    third.current.applyImpulse({x:-2,y:0,z:0})
ring.current.applyImpulse({x:0,y:-2,z:0})
  }
  
  if(forwardPressed){
    sphreRef.current.applyImpulse({x:2,y:5,z:0})
    console.log(sphreRef.current)
   }
   if (leftPressed) {
     sphreRef.current.applyImpulse({x:0,y:0,z:-5})
   }
 
   if (rightPressed) {
    sphreRef.current.applyImpulse({x:0,y:0,z:5})
   }
   if (backPressed) {
    sphreRef.current.applyImpulse({x:-2,y:5,z:0})

   }
   if (reloadPressed) {
    window.location.reload();
   }
  const kickerRotation = quat(kicker.current.rotation())
  const addRotation = new Quaternion().setFromAxisAngle(
      new THREE.Vector3(0,0.8,0),
      delta *2
  )
  kickerRotation.multiply(addRotation);
  kicker.current.setNextKinematicRotation(kickerRotation)
})

  
  //завтра сделать базовый функционал для пинг понга и начать логику
  return (
    <>
      <OrbitControls />
<ambientLight intensity={0.3}/>
<directionalLight position={[-10,10,0]} intensity={0.4}/>
{/*
риджид боди это базовые обьекты физические 
что  бы менять фигуры и не видеть красных линий добавляем пропс collaider
*/

}
<RigidBody     ref={sphreRef} colliders='ball' gravityScale={4}> 
  <Box ref={heroRef} position={[-2,1,0]} >
    <meshBasicMaterial color={'red'}/>
    </Box>
</RigidBody>
<RigidBody type="fixed" colliders='cuboid' friction={3}>
  <Box args={[8,1, 8]}  position={[0,0,0]}>
  <meshStandardMaterial color={'yellow'}/>
  </Box>
</RigidBody>
<RigidBody type="fixed" colliders='cuboid' friction={3} position={[10,1,0]} >
  <Box args={[10,1, 10]}  >
    <RigidBody colliders={'ball'} type="fixed" ref={ring}  position={[0,3,0]}  >
  <Torus   >
        <meshStandardMaterial color="hotpink" />
      </Torus>
      </RigidBody>
  <meshStandardMaterial color={'green'}/>
  </Box>
  <RigidBody  type="kinematicPosition"  ref={kicker}  colliders={'cuboid'}>
    <group position={[0,1,0]}>
    <Box args={[8,0.5,0.5]}  >
      <meshStandardMaterial color={'black'}/>
    </Box>
    </group>
  </RigidBody>
</RigidBody>
<RigidBody type="fixed" colliders='cuboid' friction={3} position={[20,4,15]} ref={third}>
  <Box args={[8,1, 8]}   >
  <meshStandardMaterial color={'brown '}/>
  </Box>
</RigidBody>
    </>
  );
};
