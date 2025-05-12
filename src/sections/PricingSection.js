import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {Suspense, useContext, useEffect, useRef, useState} from "react";
import {Model3} from "../components/Scene3";
import {ColorContext} from "../context/ColorContext";
import backgoundVideo from "../assets/video/Ink - 21536.mp4";

// Styled Components
const Container = styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   z-index: 1;
   background-color: var(--white);
   overflow: hidden;
`;
const Section = styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   z-index: 1;
   background-color: "#ffffff";
`;
const Phone = styled.div`
   width: 100%;
   height: 70%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: relative;
   cursor: grab;
`;
const Colors = styled.ul`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: absolute;
   left: 35%;
   top: 50%;
   transform: translate(-50%, -50%);
   @media screen and (max-width: 64em) {
      left: 10%;
   }
`;
const Color = styled.li`
   list-style: none;
   width: 1.5rem;
   height: 1.5rem;
   cursor: pointer;
   border-radius: 50%;
   background-color: ${(props) => props.color};
   margin: 0.5rem 0;
   border: 1px solid var(--dark);
`;
const Details = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   color: white;
`;
const Title = styled.h2`
   font-size: var(--fontxl);
   padding: 0.3rem;
`;
const SubTitle = styled.h2`
   font-size: var(--fontmd);
   font-family: var(--fontR);
`;
const IndicatorText = styled.div`
   font-size: var(--fontsm);
   position: absolute;
   top: 1rem;
`;
const VideoContainer = styled.div`
   width: 100vw;
   min-height: 100vh;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 0;
   opacity: ${(props) => (props.visible ? 1 : 0)};
   pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
   transition: opacity 1s ease;

   video {
      width: 100%;
      height: 100vh;
      object-fit: cover;
      object-position: bottom;
   }
`;

const PricingSection = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const [videoVisible, setVideoVisible] = useState(false);
    const {currentColor, changeColorContext} = useContext(ColorContext);
    const pointerDownRef = useRef({ x: 0, y: 0 });


    // Update background color on color context change
    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.style.backgroundColor = `rgba(${currentColor.rgbColor},1)`;
        }
    }, [currentColor]);

    const updateColor = (color, text, rgbColor) => {
        const newColorObj = { color, text, rgbColor };
        changeColorContext(newColorObj);
    };



    const handleModelClick = () => {
        setVideoVisible(true); // triggers render that includes the <video />
    };

    const handleVideoEnded = () => {
        setVideoVisible(false);
    };

    useEffect(() => {
        if (videoVisible && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch((e) => {
                console.warn("Video play failed:", e);
            });
        }
    }, [videoVisible]);

    return (
        <Container>
            <Section ref={sectionRef}>
                {videoVisible && (
                    <VideoContainer visible={videoVisible}>
                        <video
                            ref={videoRef}
                            src={backgoundVideo}
                            type="video/mp4"
                            muted
                            onEnded={handleVideoEnded}
                        />
                    </VideoContainer>
                )}

                <Phone>
                    <IndicatorText>360&deg; &#x27F2; </IndicatorText>
                    <Canvas camera={{fov: 30}}>
                        <ambientLight intensity={0.5} />
                        <directionalLight intensity={1} position={[5, 5, 5]} />
                        <directionalLight intensity={0.5} position={[-5, 5, 2]} />
                        <OrbitControls enableZoom={false} />
                        <Environment preset="city" />

                        <Suspense fallback={null}>
                                <Model3
                                    onClick={handleModelClick}
                                    onPointerDown={(e) => {
                                        pointerDownRef.current = { x: e.clientX, y: e.clientY };
                                    }}
                                    onPointerUp={(e) => {
                                        const dx = Math.abs(e.clientX - pointerDownRef.current.x);
                                        const dy = Math.abs(e.clientY - pointerDownRef.current.y);
                                        const dragThreshold = 5; // pixels

                                        if (dx < dragThreshold && dy < dragThreshold) {
                                            handleModelClick();
                                        }
                                    }}
                                />
                        </Suspense>
                    </Canvas>

                    {/*<Colors>*/}
                    {/*    <Color color="#ffffff" onClick={() => updateColor("#ffffff", "White", "255, 255, 255")} />*/}
                    {/*    <Color color="#F9E5C9" onClick={() => updateColor("#F9E5C9", "Gold", "249, 229, 201")} />*/}
                    {/*    <Color color="#505F4E" onClick={() => updateColor("#505F4E", "Alpine Green", "80, 95, 78")} />*/}
                    {/*    <Color color="#574f6f" onClick={() => updateColor("#574f6f", "Deep Purple", "87, 79, 111")} />*/}
                    {/*    <Color color="#A50011" onClick={() => updateColor("#A50011", "Red", "165, 0, 17")} />*/}
                    {/*    <Color color="#215E7C" onClick={() => updateColor("#215E7C", "Blue", "33, 94, 124")} />*/}
                    {/*</Colors>*/}
                </Phone>

                <Details>
                    <Title>Demo for www.facticerie.com</Title>
                    <SubTitle>Armani code Parfum</SubTitle>
                    <SubTitle>Click on parfum to activate </SubTitle>
                </Details>
            </Section>
        </Container>
    );
};

export default PricingSection;
