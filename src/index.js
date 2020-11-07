import ReactDOM from 'react-dom'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useCubeTexture, OrbitControls, ContactShadows, Box } from '@react-three/drei'

import { t, withTweaks } from './twix'

import Badge from './pmndrs'
import './styles.css'

const TweakableBox = withTweaks(Box)

function Scene() {
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cube/' })

  return (
    <>

      <t.mesh  position-y={0}>
        <octahedronBufferGeometry args={[1, 5]} />
        <t.meshPhysicalMaterial metalness={1} roughness={0} envMap={envMap} color="#f51d63" />
      </t.mesh>
    </>
  )
}


function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#f2f2f2']} />
          <t.fog attach="fog" args={['white', 10, 40]} color="#f51d63" near={4.35} far={12} />

          <t.ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight castShadow position={[2.5, 12, 12]} intensity={1} />
          <pointLight position={[20, 20, 20]} />
          <pointLight position={[-20, -20, -20]} intensity={1} />

          <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]} opacity={0.5} width={60} height={60} blur={0.1} far={2} />
          
          <OrbitControls maxPolarAngle={Math.PI / 2} />

          <TweakableBox name="rightBox" args={[2, 2]} position-x={3} rotation-y={2} />
          <TweakableBox name="leftBox" args={[2, 2]} position-x={-3} />
        
          <Scene />
        </Suspense>
      </Canvas>
      <Badge />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
