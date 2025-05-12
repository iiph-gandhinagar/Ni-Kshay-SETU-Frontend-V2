import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { langKeyForPlugin } from '@nikshay-setu-v3-monorepo/constants';
import { useLanguageObject } from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import { ReactElement } from 'react';
import { menuClasses, MenuItem } from 'react-pro-sidebar';
import { Link, To } from 'react-router-dom';

interface ListItemProps {
  title?: string;
  to?: To;
  icon?: ReactElement;
  selected?: string;
  setSelected?: ((e: string) => void) | undefined;
  isCollapsed?: boolean;
}
export const ListItem: React.FC<ListItemProps> = ({
  title = '',
  to = '',
  icon,
  selected,
  setSelected = () => null,
  isCollapsed = false,
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const notRenderAnchorsATag = ['Sign Out'];

  return (
    <MenuItem
      rootStyles={{
        [`.${menuClasses.icon}`]: {
          minWidth: isCollapsed ? 30 : 24,
          width: isCollapsed ? 30 : 24,
          height: isCollapsed ? 30 : 24,
          marginRight: isCollapsed ? 0 : 9,
        },
        [`.${menuClasses.suffix}`]: {
          margin: 0,
        },
        [`.${menuClasses.label}`]: {
          color: '#495555',
          letterSpacing: -0.16,
          lineHeight: '26.56px',
          fontWeight: 500,
        },
      }}
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={
        notRenderAnchorsATag.includes(title) ? (
          <p
            title={
              langKeyForPlugin[title] ? getText(langKeyForPlugin[title]) : title
            }
          ></p>
        ) : (
          <Link
            title={
              langKeyForPlugin[title] ? getText(langKeyForPlugin[title]) : title
            }
            to={to}
          />
        )
      }
      suffix={
        isCollapsed ? null : (
          <img src={ArrowSvg} alt='icon' width={18} height={18} />
        )
      }
    >
      {isCollapsed
        ? null
        : langKeyForPlugin[title]
        ? getText(langKeyForPlugin[title])
        : title}
    </MenuItem>
  );
};
