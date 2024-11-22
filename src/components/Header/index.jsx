import styled from 'styled-components';

const Header = () => {

    return (
        <TitleHeader>
            <h1>
            Find me
            </h1>
        </TitleHeader>
       
    )
}

export default Header;

const TitleHeader = styled.header`
  position: fixed;
  top: 0;
  z-index: 200;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 32px;
  padding: 8px;
  background-color: #1d222c;
  color : white;
`;