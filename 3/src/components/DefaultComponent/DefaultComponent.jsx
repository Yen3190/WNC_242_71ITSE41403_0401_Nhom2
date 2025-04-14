import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import Footer from "../FooterComponent/FooterComponent";
import { WrapperPageContainer, WrapperContent } from "./style.js";

const DefaultComponent = ({ children }) => {
    return (
        <WrapperPageContainer>
            <HeaderComponent />
            <WrapperContent>{children}</WrapperContent>
            <Footer />
        </WrapperPageContainer>
    );
};

export default DefaultComponent;
