import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';

interface BreadcrumbProps {
  data?: any; // Adjust the type from 'any' to a more specific type if possible
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [langKey, getText, objectToValue] = useLanguageObject();

  // Get the current route path
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map pathnames to breadcrumb labels dynamically
  const breadcrumbMap: Record<string, string> = {
    'screening-tool': getText('APP_SCREENING_TOOL'),
    result: getText('APP_RESULT'),
    nutrition: getText('APP_NUTRITION'),
    next_step_for_pre_case: getText('APP_SCREENING_NEXT_FOR_PRES_CASE'),
  };

  const handleBreadcrumbClick = (to: string) => {
    if (to === '/screening-tool') {
      navigate(to);
    } else {
      navigate(to, { state: data });
    }
  };

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = breadcrumbMap[value] || value;

    const isPast = index < pathnames.length - 1;

    return (
      <li key={to} className='flex items-center'>
        {isPast ? (
          <button
            onClick={() => handleBreadcrumbClick(to)}
            className='text-sm font-medium text-gray-600 hover:text-blue-500'
          >
            {label}
          </button>
        ) : (
          <span className='text-sm font-medium text-blue-600'>{label}</span>
        )}
        {index < pathnames.length - 1 && (
          <span className='mx-2 text-gray-400'>/</span>
        )}
      </li>
    );
  });

  return (
    <nav className='bg-white shadow-sm p-4 rounded-md'>
      <ul className='flex space-x-2'>{breadcrumbItems}</ul>
    </nav>
  );
};

export default Breadcrumb;
