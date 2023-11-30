import React from 'react'


function Point({...props}) {
  return (
      <Ring position={props.position}>
        <meshStandardMaterial color="hotpink" />
      </Ring>
  )
}


export default Point
