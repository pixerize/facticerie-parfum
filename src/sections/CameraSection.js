import styled from "styled-components";
import scuba from "../assets/video/Scuba Diving - 699.mp4";
import skate from "../assets/video/Skate - 49791.mp4";
import {useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";

const Section = styled.section`
   width: 100vw;
   min-height: 100vh;
   position: relative;
   z-index: 1;
   background-color: var(--white);
   overflow: hidden;
`;

const V1 = styled.video`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   object-fit: cover;
   object-position: bottom;
   z-index: 2;
`;

const V2 = styled.video`
   position: absolute;
   top: 0;
   right: 40%;
   width: 60%;
   height: auto;
   z-index: 1;
   @media screen and (max-width: 30em) {
      width: 100%;
      right: 0;
      top: 10%;
   }
`;

const TitleContainer = styled.div`
   width: 50%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: absolute;
   top: 0;
   right: 0;
   & > *:nth-child(2) {
      margin-left: 6rem;
   }
   & > *:nth-child(3) {
      margin-left: 12rem;
   }
   @media screen and (max-width: 48em) {
      top: 60%;
      right: 2rem;
   }
   @media screen and (max-width: 40em) {
      right: 5rem;
   }
   @media screen and (max-width: 30em) {
      top: 70%;
      right: 40%;
   }
`;

const Title = styled.h1`
   font-size: var(--fontBig);
   z-index: 5;
   text-transform: capitalize;
   @media screen and (max-width: 70em) {
      font-size: var(--fontxxxl);
   }
   @media screen and (max-width: 48em) {
      font-size: var(--fontxxl);
   }
`;

const CameraSection = (props) => {


    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const titleRef = useRef(null);
    const sectionRef = useRef(null);


    useLayoutEffect(() => {

        const Elem = sectionRef.current;
        let titleElements = gsap.utils.selector(titleRef);
        const videoElem1 = videoRef1.current;
        const videoElem2 = videoRef2.current;

        //pin the section
        gsap.to(Elem, {
            scrollTrigger: {
                trigger: Elem,
                start: 'top top',
                end: `bottom+=500 bottom`,
                scrub: true,
                pin: true,
                pinSpacing: true
            }
        })

        let t2 = gsap.timeline({
            scrollTrigger: {
                trigger: Elem,
                start: 'top top',
                end: `bottom+=500 bottom`,
                scrub: true,
            }
        }).to(videoElem1, {scale: 0.3}, "key1").to(videoElem2, {scale: 0.6}, "key1");

        //three args fromTo
        //elem, starting anim, and stop anima 100
        //like 0% to 100%
        titleElements('h1').forEach(el =>
            t2.fromTo(el,
                {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top',
                        end: `bottom bottom`,
                        scrub: true,
                    },
                    x: 100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1
                }
            )
        )

        return () => {
            if (t2) t2.kill();
        }
    }, []);


    return (
        <Section ref={sectionRef}>
            <V1 ref={videoRef1} src={scuba} type="videp/mp4" autoPlay muted loop/>
            <V2 ref={videoRef2} src={skate} type="videp/mp4" autoPlay muted loop/>
            <TitleContainer ref={titleRef}>
                <Title>Ready.</Title>
                <Title>Steady.</Title>
                <Title>Action.</Title>
            </TitleContainer>
        </Section>
    )
};

export default CameraSection;