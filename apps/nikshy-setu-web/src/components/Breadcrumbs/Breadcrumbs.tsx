import React from 'react';
import { ChevronRight2 } from '../Icon/ChevronRight';

interface BreadcrumbsProps {
  name?: string;
}
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ name = '' }) => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-[8px]'>
        <li>
          <span className='text-[18px] leading-[21.6px] -tracking-[0.64px] text-GREY_808080'>
            All Modules
          </span>
        </li>
        <li aria-current='page'>
          <div className='flex items-center gap-[8px]'>
            <ChevronRight2 />
            <span className='text-[18px] leading-[21.6px] -tracking-[0.16px] font-medium text-darkBlue'>
              Screening
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};
