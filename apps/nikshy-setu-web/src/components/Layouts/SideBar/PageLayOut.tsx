import React, { useState } from 'react';
import { Navbar2 } from '../Navbar';
import { SideBar } from './Sidebar';

interface PageLayOutProps {
  children: React.ReactNode;
}

export const PageLayOut: React.FC<PageLayOutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia('(max-width: 1023px').matches
  );
  return (
    <React.Fragment>
      <Navbar2
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
        setSideBarToggled={() => setSideBarToggled(!sideBarToggled)}
        isCollapsed={isCollapsed}
        setIsCollapsed={() => setIsCollapsed(!isCollapsed)}
      />
      <div className='container mx-auto'>
        <div className='lg:flex gap-6'>
          <div className='flex-1 min-w-0'>{children}</div>
          <SideBar
            isCollapsed={!broken && isCollapsed}
            toggled={sideBarToggled}
            setBroken={setBroken}
            onBackdropClick={() => setSideBarToggled(false)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
