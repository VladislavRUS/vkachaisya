import styled from 'styled-components';

export const Wrapper = styled.div`
  & + & {
    margin-top: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: #403e4b;
  font-family: Lato, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22.14px;
`;

export const Description = styled.div`
  color: #9193a5;
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
`;

export const Badges = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 126px;
  height: 100px;
  border-radius: 50%;
  background-color: #56cc95;
  transform: translate(50%, 50%);
`;
