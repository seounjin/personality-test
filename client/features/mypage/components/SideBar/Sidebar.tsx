import React from 'react';
import { Wrapper, MenuWrapper, MenuButton } from './Sidebar.style';

interface SidebarMenu {
  id: string;
  text: string;
  isActive: boolean;
}

interface SidebarProps {
  handleClick: (index: number) => void;
  sidebarMenu: SidebarMenu[];
}

const Sidebar = ({ handleClick, sidebarMenu }: SidebarProps): JSX.Element => {
  return (
    <Wrapper>
      <MenuWrapper>
        {sidebarMenu.map(({ id, text, isActive }, index) => (
          <MenuButton
            key={id}
            onClick={() => handleClick(index)}
            type="button"
            role="tab"
            aria-selected={isActive}
            isActive={isActive}
          >
            {text}
          </MenuButton>
        ))}
      </MenuWrapper>
    </Wrapper>
  );
};

export default Sidebar;
