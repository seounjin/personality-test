import Link from 'next/link';
import React from 'react';
import { NavLink } from '../NavLink/NavLink';

const Logo = () => {
  return (
    <NavLink isActive={true}>
      <Link href={'/'}>Logo</Link>
    </NavLink>
  );
};

export default Logo;
