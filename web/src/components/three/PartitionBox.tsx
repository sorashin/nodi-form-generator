import { Box, Edges } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { boxConfigAtom, colorPaletteAtom, phantomSizeAtom } from "../../store";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";
import { RoundedBox } from "./geometry/RoundedBox";
import * as THREE from "three";
import { group } from "console";
import { HingeGeometry } from "./geometry/Hinge";
import { BoundingBox } from "./BoundingBox";

type PartitionBoxProps = {
    width:number,
    height:number,
    depth:number,
}
export const PartitionBox: React.FC<PartitionBoxProps> = ({ width,height,depth }) => {
    const boxRef = useRef<THREE.Group>(null);
    const partitionRef = useRef<THREE.Mesh>(null);
    const boxConfig = useAtomValue(boxConfigAtom);
    const colorPalette = useAtomValue(colorPaletteAtom);
    const phantomSize = useAtomValue(phantomSizeAtom);

    
    return(
        <>
            <group position={[0,0,phantomSize.height/2]} ref={boxRef}>
                <mesh ref={partitionRef} >
                    <RoundedBox width={depth} height={width} depth={height} radius={boxConfig.fillet}/>
                    <meshStandardMaterial color={colorPalette[boxConfig.colorMode].primary}/>
                </mesh>
                {/* outer */}
                <mesh position={[0,0,2]}>
                    <RoundedBox width={depth+6} height={width+6} depth={height+8} radius={boxConfig.fillet}/>
                    <meshStandardMaterial color={colorPalette[boxConfig.colorMode].secondary} transparent opacity={0.5}/>
                </mesh>
                <mesh position={[5.8/2+(depth+6)/2,0,phantomSize.height/2-22/2+6]} rotation={[Math.PI*.5,0,Math.PI*.5]}>
                    <RoundedBox width={22} height={5.8} depth={35} radius={boxConfig.fillet}/>
                    <meshStandardMaterial color={colorPalette[boxConfig.colorMode].secondary} transparent opacity={0.5}/>
                </mesh>
                {/* HINGE */}
                <mesh position={[-depth/2-3-3,0,height/2]} rotation={[0.5*Math.PI,0,Math.PI]}>
                    <HingeGeometry depth={29}/>
                    <meshStandardMaterial color={colorPalette[boxConfig.colorMode].secondary} transparent opacity={0.5}/>
                </mesh>
            </group>
            <BoundingBox target={partitionRef} color1={"#2391EB"} color2={'#999'}/>
            <BoundingBox target={boxRef} color1={"#999"} color2={'#999'} edgeOnly/>
        </>
    )
  }
