import React from "react";
import styled from "styled-components";
import video from '../../assets/images/video.mp4';

const AboutSection = styled.section`
    width: 100%;
    max-width: 12000px;
    margin: 10px auto;
    background: #f8f8f8;
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
`;

const Heading = styled.h1`
    font-size: 3rem;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
    font-weight: bolder;
    span {
        color: #e84393;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5rem;
    justify-content: center;
`;

const VideoContainer = styled.div`
    flex: 1 1 48%;
    max-width: 700px;
    position: relative; /* Để h3 nằm chồng lên video */
    
    video {
        width: 100%;
        border: 1.5rem solid #fff;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    h3 {
        position: absolute;
        font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
        font-weight: bolder;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3.55rem;
        background: #fff;
        width: 100%;
        padding: 1rem 2rem;
        text-align: center;
        mix-blend-mode: screen;
    }
`;

const Content = styled.div`
    flex: 1 1 48%;
    max-width: 500px;
    
    h3 {
        font-size: 30px;
        color: #333;
        margin-bottom: 15px;
        font-weight: bolder;
        
    }

    p {
        font-size: 30px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 10px;
    }
`;

const LearnMoreButton = styled.a`
    display: inline-block;
    margin-top: 10px;
    padding: 12px 24px;
    background: #333;
    color: white; 
    text-decoration: none;
    border-radius: 40px;
    transition: 0.01s ease-in-out;
    font-size: 1.8rem;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    text-align: center;

    &:hover {
        background:rgb(236, 119, 176);
    }
`;

const AboutComponent = () => {
    return (
        <AboutSection>
            <Heading>
                <span>About</span> Us
            </Heading>
            <Row>
                <VideoContainer>
                    <video src={video} loop autoPlay muted></video>
                    <h3>From Best Flowers Gardens</h3>
                </VideoContainer>
                <Content>
                    <h3>Why Choose Us?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Eu facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum</p>
                    <LearnMoreButton href="#">Learn More</LearnMoreButton>
                </Content>
            </Row>
        </AboutSection>
    );
};

export default AboutComponent;
