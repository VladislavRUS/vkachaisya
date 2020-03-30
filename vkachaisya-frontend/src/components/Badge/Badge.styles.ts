import styled from 'styled-components';

export const Wrapper = styled.div<{ bgColor: string }>`
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
`;

export const Text = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Lato, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 13.28px;
`;
