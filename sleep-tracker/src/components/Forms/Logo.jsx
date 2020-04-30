import React from 'react'
import styled from 'styled-components'
import Stars from './images/Stars.jpg'

const LogoBackground = styled.div`
    border: 1px solid #000;
    background-image: url(${Stars});
    margin-bottom: 4vh;
    padding: 9vh;
`;

const StyledLogo = styled.h1`
font-weight: bolder;
font-size: 8rem;
background: -webkit-linear-gradient(bottom, #263D42, #2A9D8F, #FF5A1E, #263D42 );
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: 'Righteous', cursive;
text-align: center;
`


const Logo = () => {
    return (
        <div>
            
           
           <LogoBackground>
    <StyledLogo>   Sleep Tracker   </StyledLogo>
            </LogoBackground>
        </div>
    )
}

export default Logo