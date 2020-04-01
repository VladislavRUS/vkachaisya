import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TextArea = styled.textarea`
  padding: 24px 16px;
  color: #9193a5;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 300;
  flex-grow: 1;
  outline: none;
  resize: none;
  border: none;
  outline: none;
`;

export const Bottom = styled.div`
  margin: 0 15px;
  border-top: 1px solid #f5f5f5;
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
`;
