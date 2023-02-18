interface Menu {
  id: string;
  text: string;
  type: string;
  asPath: string;
}

export interface SidebarMenu extends Menu {
  subMenu: Array<Menu>;
}
