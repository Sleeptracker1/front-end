import React from 'react'
import styled from 'styled-components'
import Stars from './images/Stars.jpg'

const Content = styled.div`
    border: 1px solid #000;
    background-image: url(${Stars});
    margin-bottom: 4vh;
`;

const StyledLogo = styled.h1`
font-weight: bolder;
font-size: 6rem;
background: -webkit-linear-gradient(bottom, #263D42, #2A9D8F, #FF5A1E, #263D42 );
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: 'Righteous', cursive;
text-align: center;
`


const Logo = () => {
    return (
        <div>
            
           
           <Content>
    <StyledLogo>   Sleep Tracker   </StyledLogo>
            </Content>
        </div>
    )
}

export default Logo