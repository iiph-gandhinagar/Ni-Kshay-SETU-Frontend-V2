import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from '../../components/Icon/ChevronRight';
import { useLanguageObject } from '../../utils/HelperHooks';

type AlgorithmsBreadcrumbTypes = {
  tabs?: { label: string; link?: string; icon?: ReactNode }[];
};
export const AlgorithmsBreadcrumb = ({
  tabs = [],
}: AlgorithmsBreadcrumbTypes) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const items: AlgorithmsBreadcrumbTypes['tabs'] = [
    { label: getText('APP_HOME'), link: '/home' },
    ...tabs,
  ];

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center space-x-1 text-gray-500 my-2'
    >
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <AlgorithmsBreadcrumbLInk link={item.link}>
            {item.icon} {!item.icon && <span>{item.label}</span>}
          </AlgorithmsBreadcrumbLInk>
          {index < items.length - 1 && (
            <ChevronRight height={15} width={15} stroke='#707070' />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

const AlgorithmsBreadcrumbLInk = ({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) => {
  if (link) {
    return (
      <Link
        to={link}
        className='flex items-center text-blue-400 hover:text-blue-500'
      >
        {children}
      </Link>
    );
  }

  return <div className='flex items-center text-gray-600'>{children}</div>;
};
