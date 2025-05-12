import {GlobalStyle} from "./styles/GlobalStyle";
import Quote from "./sections/Quote";
import HeroSection from "./sections/HeroSection";
import PhoneModel from "./sections/PhoneModel";
import DesignSection from "./sections/DesignSection";
import DisplaySection from "./sections/DisplaySection";
import ProcessorSection from "./sections/ProcessorSection";
import BatterySection from "./sections/BatterySection";
import Color from "./sections/Color";
import CameraSection from "./sections/CameraSection";
import PricingSection from "./sections/PricingSection";
import {ColorContextProvider} from "./context/ColorContext";

function App() {
    return (
        <>
            <GlobalStyle/>

            <ColorContextProvider>
                <PricingSection />
            </ColorContextProvider>

        </>
    );
}

export default App;
