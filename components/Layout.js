import styled from 'styled-components'
import ReactDOM from 'react-dom';

export default function Layout({ children }) {
    return (
        <Main>
            {children}
        </Main>
    )
}

const Main = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    
    background-image: url('/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    opacity: 0.9; 
    
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      background-position: center center;
      position: absolute; 
    }
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
`;
