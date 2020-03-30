import styled from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 20px;
  background-color: #ffffff;
  padding: 22px 20px 25px 20px;
  box-shadow: 0 1px 10px -2px rgba(0, 0, 0, 0.1);

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
  font-size: 20px;
  font-weight: 700;
  line-height: 22.14px;
`;

export const Description = styled.div`
  color: #9193a5;
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  margin-bottom: 22px;
`;

export const Badges = styled.div`
  display: flex;
  align-items: center;
`;
