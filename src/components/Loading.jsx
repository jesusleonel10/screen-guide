import styled, { keyframes } from 'styled-components'


const Loading = () => {
    return (
        <Container>
            <DualRing />
        </Container>
    );
}
 
export default Loading;

const ringdual = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container =  styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    min-height: 15rem;
`;
    
const DualRing = styled.div`
        display: inline-block;
        width: 80px;
        height: 80px;
        &::after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid black;
            border-color: black transparent black transparent;
            animation: ${ringdual} 1.2s linear infinite;
        }
    `;

