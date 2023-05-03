import styled, {keyframes} from "styled-components";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useLayoutEffect, useRef} from "react";

//style component
const Section = styled.section`
   width: 100vw;
   height: 100vh;
   position: relative;

   display: flex;
   justify-content: center;
   align-items: center;
`
const TextContainer = styled.div`
   width: 100vw;
   height: 100vh;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   background-color: var(--dark);
   color: var(--white);
`

const moveUp = keyframes`
100% {
   transform: translateY(0);
}
`

const Text = styled.p`
   width: 50%;
   font-size: var(--fontlg);
   position: relative;
   height: var(--fontmd);
   overflow: hidden;

   span {
      position: absolute;
      transform: translateY(3rem);
      animation-name: ${moveUp};
      animation-duration: 2.5s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      font-family: var(--fontL);
      background-image: linear-gradient(-45deg, var(--gradient));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
   //   animation props
      animation-delay: ${props => props.delay};
   }

   &:not(:first-child) {
      text-indent: 8px;
   }
   
   .author {
      width: 100%;
      text-align: end;
      margin-left: -8px;
      background-image: linear-gradient(-180deg, var(--gradient))
   }
   
   //1120px
   @media screen and (max-width: 70em) {
      width: 70%;
   }
   @media screen and (max-width: 48em) {
      font-size: var(--fontmd);
      height: var(--fontsm);
   }
   @media screen and (max-width: 40em) {
      width: 90%;
   }
   @media screen and (max-width: 30em) {
      font-size: var(--fontxs);
   }

`


const Quote = (props) => {
    // register gsap
    //make sure to use in useEffect, its important dom has been rendered before you start animation
    gsap.registerPlugin(ScrollTrigger);
    const sectionRef = useRef(null);


    // useLayoutEffect fires after DOM mutation, so we can use animation

    useLayoutEffect(() => {
        let Elem = sectionRef.current;
        let trigger = ScrollTrigger.create({
            trigger: Elem,
            //start two paremeter, when reaches
            start: "top top",
            // end: "bottom-=100 center",
            pin: true,
            //pin add extra spacing around component, we remove with next code:
            pinSpacing: false,
        });

        //when using animation make sure to clean up the call
        return() => {
            if (trigger) trigger.kill()
        }
    }, []);


    return (
        <Section ref={sectionRef}>
            <TextContainer>
                <Text delay="0s"> <span>&#8220;You can't connect the dots looking forward;</span></Text>
                <Text delay="0.4s"> <span> you can only connect them looking backward.</span></Text>
                <Text delay="0.8s"> <span>so you have to trust that the dots</span></Text>
                <Text delay="1.2s"> <span>will somehow connect in your future.&#8220;</span></Text>
                <Text delay="1.6s"> <span className='author'>- Steve Jobs</span></Text>
            </TextContainer>

        </Section>
    )
};

export default Quote;