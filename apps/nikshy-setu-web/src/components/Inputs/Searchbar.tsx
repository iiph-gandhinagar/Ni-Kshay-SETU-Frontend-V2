import { HistorySvg, Search2Icon } from '@nikshay-setu-v3-monorepo/assets';
import React, { FocusEventHandler } from 'react';
import { SearchIconSvg } from '../Icon/SearchIcon';

interface SearchbarProps {
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: FocusEventHandler | undefined;
}

export const Searchbar: React.FC<SearchbarProps> = ({
  disabled = false,
  autoFocus = false,
  id,
  name,
  placeholder = 'Search',
  value = '',
  onChange = () => null,
  onBlur = () => null,
}) => {
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none'>
        <img src={Search2Icon} alt='search' />
      </div>
      <input
        disabled={disabled}
        autoFocus={autoFocus}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className='block w-[133px] p-1 ps-10 text-[14px] text-black rounded-[12px] h-[48px] bg-gradient-to-r from-[#f1f1f14d] from-0% to-[#ececec4d] placeholder:text-[#ACABAB] outline-none leading-[16.8px] -tracking-[0.32px]'
      />
    </div>
  );
};

interface Searchbar2Props {
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onFocus?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: FocusEventHandler | undefined;
  showSearchIcon?: boolean;
  showVoiceAndHistoryIcons?: boolean;
  inputClassName?: string;
}

export const Searchbar2: React.FC<Searchbar2Props> = ({
  disabled = false,
  autoFocus = false,
  id,
  name,
  placeholder = 'Ask anything..',
  value = '',
  onChange = () => null,
  onFocus = () => null,
  onBlur = () => null,
  showSearchIcon = false,
  showVoiceAndHistoryIcons = false,
  inputClassName = '',
}) => {
  return (
    <div className='relative md:mx-5 mt-10'>
      {showSearchIcon ? (
        <div className='absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none z-20'>
          <SearchIconSvg stroke='black' />
        </div>
      ) : null}
      <input
        disabled={disabled}
        autoFocus={autoFocus}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        className={`bg-F8FAFF text-black placeholder:text-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] rounded-[16px] block w-full px-4 py-[18.5px] -tracking-[0.16px] font-medium outline-none ${inputClassName}`}
      />
      <div className='absolute inset-y-0 end-0 flex items-center pe-4 gap-[8px]'>
        {showVoiceAndHistoryIcons ? (
          <React.Fragment>
            <img
              src={HistorySvg}
              alt='history'
              className='cursor-pointer w-7 h-7'
            />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};
