import { useRouter } from 'next/router';
import React from 'react';
import {
  Wrapper,
  MenuWrapper,
  Menu,
  SubMenu,
  MenuTitle,
} from './Sidebar.style';
import { SidebarMenu } from './SideBar.types';

interface SidebarProps {
  onClick: (asPath: string) => void;
  sidebarMenu: SidebarMenu[];
}

const Sidebar = ({ onClick, sidebarMenu }: SidebarProps): JSX.Element => {
  const router = useRouter();

  return (
    <Wrapper className="sidebar">
      <MenuWrapper className="menu_wrapper">
        {sidebarMenu.map((item) => {
          {
            return item.type === 'button' ? (
              <Menu
                key={item.id}
                type="button"
                aria-label={`${item.text} 버튼`}
                onClick={() => onClick(item.asPath)}
                isActive={router.pathname === item.asPath}
              >
                {item.text}
              </Menu>
            ) : (
              <React.Fragment key={item.id}>
                <MenuTitle>{item.text}</MenuTitle>
                {item.subMenu.map((subItem) => (
                  <SubMenu
                    key={subItem.id}
                    type="button"
                    aria-label={`${subItem.text} 버튼`}
                    onClick={() => onClick(subItem.asPath)}
                    isActive={router.asPath === subItem.asPath}
                  >
                    {subItem.text}
                  </SubMenu>
                ))}
              </React.Fragment>
            );
          }
        })}
      </MenuWrapper>
    </Wrapper>
  );
};

export default Sidebar;
