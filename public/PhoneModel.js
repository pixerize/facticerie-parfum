import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Model} from "../assets/3D-Model/Scene";

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
        <Container>
            <Canvas>
                {/*add source light*/}
                <ambientLight intensity={1.25} />
                <directionalLight position={[1,0,0]}/>

                <Model />

                {/*<mesh> /!*basic class represent polygon objects*!/*/}
                {/*    <boxGeometry />*/}
                {/*    <meshStandardMaterial color="red" />*/}
                {/*/!*    more about it in three js docs*!/*/}
                {/*</mesh>*/}
                <OrbitControls />
            </Canvas>
        </Container>
    )
};

export default PhoneModel;