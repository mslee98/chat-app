import styled from "@emotion/styled";
import { List, Menu } from "antd";



export const StyledListItem = styled(List.Item)`

  &:hover {
    background-color: #f0f0f0; /* 호버 효과에 적용할 스타일 */
  }
`

export const WorkspaceButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 3px solid #3f0e40;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
  color: black;
  cursor: pointer;
`

export const Workspaces = styled.div`
  width: 70px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #3f0e40;
  vertical-align: top;
  text-align: center;
  padding: 10px 0 0;
`;

export const StyledSubMenu = styled(Menu.SubMenu)`
  .ant-menu-title-content {
    color: #fff;
    margin-left: 15px;
  }

  .ant-menu-submenu-arrow {
    left: 20px;
    color: #fff
  }
`