import styled from '@emotion/styled';

export const WorkspaceModal = styled.div`
  padding: 10px 0 0;
  & h2 {
    padding-left: 20px;
  }
  & > button {
    width: 100%;
    height: 28px;
    padding: 4px;
    border: none;
    background: transparent;
    border-top: 1px solid rgb(28, 29, 28);
    cursor: pointer;
    &:last-of-type {
      border-bottom: 1px solid rgb(28, 29, 28);
    }
  }
`;
