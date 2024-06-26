/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { Edges, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    tray: THREE.Mesh;
  };
  materials: {
    diffuse_0_0_0_255: THREE.MeshPhysicalMaterial;
  };
};

export function Tray(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/tray.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.tray.geometry}
        material={materials.diffuse_0_0_0_255}
        rotation={[0, Math.PI, 0]}
        position={[0, 0, -5]}
        scale={2.5}
      >
        <meshStandardMaterial color={new THREE.Color(`#f5f5f5`)} transparent opacity={0.01}/>
        <Edges color={new THREE.Color("rgb(67, 67, 67)")}/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/tray.glb");
