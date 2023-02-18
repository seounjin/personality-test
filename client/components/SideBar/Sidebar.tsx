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
    <Wrapper>
      <MenuWrapper>
        {sidebarMenu.map((item) => {
          {
            return item.type === 'button' ? (
              <Menu
                key={item.id}
                onClick={() => onClick(item.asPath)}
                isActive={router.asPath === item.asPath}
              >
                {item.text}
              </Menu>
            ) : (
              <React.Fragment key={item.id}>
                <MenuTitle>{item.text}</MenuTitle>
                {item.subMenu.map((subItem) => (
                  <SubMenu
                    key={subItem.id}
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
