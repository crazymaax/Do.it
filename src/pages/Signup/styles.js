import styled from "styled-components";
import { keyframes } from "styled-components";
import image from "../../assets/signup.svg"

export const Container = styled.div`
height: 100vh;
display: flex;
align-items: stretch;
`

export const Background = styled.div`
@media (min-width: 1100px){
    flex: 1;
    background: url(${image}) no-repeat center, var(--black);
    background-size: contain;
}
`

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
width: 100%;
max-width: 700px;
`

export const AppearFromRight = keyframes`
from{
    opacity: 0;
    transform: translate(50px);
}

to{
    opacity: 1;
    transform: translate(0px);
}
`

export const AnimationContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
animation: ${AppearFromRight} 1s;

form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
        margin-bottom: 32px;
    }

    > div {
        margin-top: 16px;
    }

    p {
        margin-top: 8px;

        a {
            font-weight: bold;
            color: var(--orange)
        }
    }
    
}
`
