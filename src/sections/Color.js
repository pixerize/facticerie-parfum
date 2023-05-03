import styled from "styled-components";
import {Suspense, useContext, useEffect, useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";
import {Environment, useGLTF} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Model2} from "../components/Scene2";
import {ColorContext} from "../context/ColorContext";

const Section = styled.section`
   width: 100vw;
   height: 100vh;
   position: relative;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const Left = styled.div`
   width: 50%;
   height: 100%;
   display: flex;
   background-color: rgba(155, 181, 206, 0.8);
   position: relative;
   @media screen and (max-width: 48em) {
      width: 100%;
   }
`;
const Right = styled.div`
   width: 50%;
   height: 100%;
   display: flex;
   background-color: rgba(155, 181, 206, 0.4);
   position: relative;
   @media screen and (max-width: 48em) {
      display: none;
   }
`;

const Center = styled.div`
   width: 100%;
   text-align: center;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%) rotate(-90deg);
   font-size: var(--fontxxl);
   text-transform: uppercase;
   filter: brightness(0.85);
   @media screen and (max-width: 48em) {
      top: 2rem;
      transform: translate(-50%, 0%) rotate(0deg);
   }
`;


const Color = (props) => {
    const {currentColor, changeColorContext} = useContext(ColorContext);

    useEffect(() => {
        let rightElem = rightRef.current;
        let leftElem = leftRef.current;
        let textElem = textRef.current;

        textElem.innerText = currentColor.text;
        textElem.style.color = currentColor.color;

        leftElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.8)`;
        rightElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.4)`;
    }, [currentColor]);
    
    
    useLayoutEffect(() => {

        let Elem = sectionRef.current;

        //update colors

        let updateColor = (color, text, rgbColor) => {

            const newColorObj = {
                color,
                text,
                rgbColor
            }
            changeColorContext(newColorObj);

        }

        //pin the section
        gsap.to(Elem, {
            scrollTrigger: {
                trigger: Elem,
                start: 'top top',
                end: `+=${Elem.offsetWidth + 1000}`,
                scrub: true,
                pin: true,
                pinSpacing: true
            }
        })

        //update colors for
        let t2 = gsap.timeline({
            scrollTrigger: {
                trigger: Elem,
                start: 'top top',
                end: `+=${Elem.offsetWidth + 1000}`,
                scrub: true,
            }
        }).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
            }
        ).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#F9E5C9", "Gold", "249, 229, 201"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#F9E5C9", "Gold", "249, 229, 201"],
            }
        ).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#505F4E", "Alpine Green", "80, 95, 78"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#505F4E", "Alpine Green", "80, 95, 78"],
            }
        ).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#574f6f", "Deep Purple", "87, 79, 111"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#574f6f", "Deep Purple", "87, 79, 111"],
            }
        ).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#A50011", "Red", "165, 0, 17"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#A50011", "Red", "165, 0, 17"],
            }
        ).to(Elem,
            {
                onStart: updateColor,
                onStartParams: ["#215E7C", "Blue", "33, 94, 124"],
                onReverseComplete: updateColor,
                onReverseCompleteParams: ["#215E7C", "Blue", "33, 94, 124"],
            }
        )


        return () => {

        }
    }, []);


    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const textRef = useRef(null);


    return (
        <Section ref={sectionRef}>
            <Left ref={leftRef}/>
            <Center ref={textRef}></Center>
            <Right ref={rightRef}>
                <Canvas
                    camera={{fov: 6.5}}>
                    {/*add source light*/}
                    <ambientLight intensity={1.25} />
                    <directionalLight position={0.4}/>
                    {/*<OrbitControls />*/}
                    {/*free control*/}
                    <Environment preset='night'/>

                    {/*different presets: https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts*/}

                    {/*<Model2 />*/}
                    <Suspense fallback ={null}> {/* to load async*/}
                        <Model2 />
                    </Suspense>

                    {/*<mesh> /!*basic class represent polygon objects*!/*/}
                    {/*    <boxGeometry />*/}
                    {/*    <meshStandardMaterial color="red" />*/}
                    {/*/!*    more about it in three js docs*!/*/}
                    {/*</mesh>*/}

                </Canvas >
                </Right>
        </Section>
    )
};

export default Color;