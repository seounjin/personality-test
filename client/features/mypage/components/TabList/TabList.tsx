import { useRouter } from 'next/router';
import React from 'react';
import { SidebarMenu } from '../../../../components/SideBar/SideBar.types';
import { TabListWrapper, TabWrapper, Tab } from './TabList.style';

interface TabListProps {
  onClick: (asPath: string) => void;
  tabList: Omit<SidebarMenu, 'subMenu'>[];
}

const TabList = ({ onClick, tabList }: TabListProps): JSX.Element => {
  const router = useRouter();

  return (
    <TabListWrapper>
      <TabWrapper>
        {tabList.map((item) => (
          <Tab
            key={item.id}
            onClick={() => onClick(item.asPath)}
            isActive={router.asPath === item.asPath}
          >
            {item.text}
          </Tab>
        ))}
      </TabWrapper>
    </TabListWrapper>
  );
};

export default TabList;
