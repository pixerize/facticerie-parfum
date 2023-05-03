import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {Model} from "../components/Scene"
import {Model2} from "../assets/S22-Ultra/Scene";
import {Suspense} from "react";

const Container = styled.div`
   width: 100vw;
   height: 100vh;

   position: fixed;
   top: 0;
   z-index: 1;
   background-color: transparent;
`

const PhoneModel = (props) => {


    return (
        <Container id="phone-model">
            <Canvas camera={{fov: 14}}>
                {/*add source light*/}
                <ambientLight intensity={1.25} />
                <directionalLight position={0.4}/>
                {/*<OrbitControls />*/}
                {/*free control*/}
                <Environment preset='night'/>

                {/*different presets: https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts*/}

                {/*<Model2 />*/}
                <Suspense fallback ={null}> {/* to load async*/}
                <Model />
                </Suspense>

                {/*<mesh> /!*basic class represent polygon objects*!/*/}
                {/*    <boxGeometry />*/}
                {/*    <meshStandardMaterial color="red" />*/}
                {/*/!*    more about it in three js docs*!/*/}
                {/*</mesh>*/}

            </Canvas>
        </Container>
    )
};

export default PhoneModel;