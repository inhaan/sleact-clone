import styled from '@emotion/styled';

export const RightMenu = styled.div`
  float: right;
`;

export const Header = styled.header`
  height: 38px;
  background: #350d36;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
  cursor: pointer;
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Workspaces = styled.div`
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #3f0e40;
  border-top: 1px solid rgb(82, 38, 83);
  border-right: 1px solid rgb(82, 38, 83);
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
  min-height: calc(100vh - 38px);
`;

export const Channels = styled.nav`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  color: rgb(188, 171, 188);
  vertical-align: top;
  & a {
    padding-left: 36px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    &.selected {
      color: white;
    }
  }
  & .bold {
    color: white;
    font-weight: bold;
  }
  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }
  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

export const WorkspaceName = styled.button`
  height: 64px;
  line-height: 64px;
  border: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 900;
  font-size: 24px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  padding-left: 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

export const Chats = styled.div`
  flex: 1;
`;

export const AddButton = styled.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;
