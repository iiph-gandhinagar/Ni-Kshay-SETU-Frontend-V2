import { AddSvg, EditOutlineSvg } from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import React, { useId, useState } from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
import { loginFormFieldType } from './LoginModal';

interface AddProfilePictureProps {
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  values?: loginFormFieldType;
}

export const AddProfilePicture: React.FC<AddProfilePictureProps> = ({
  onImageChange,
  name,
  values,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(
    values.profileImage && STORE_URL + values.profileImage
  );
  const [langKey, getText, objectToValue] = useLanguageObject();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onImageChange) onImageChange(event);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputID = useId();

  return (
    <div
      className={`border-[0.5px] border-D9DBDB rounded-[12px] pb-4 pt-2 px-5`}
    >
      {/* Hidden File Input */}
      <input
        name={name}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
        id={inputID}
      />

      {/* Header */}
      <div className='flex justify-between items-center'>
        <label
          className={`block text-[18px] leading-[18px] font-medium text-darkGray495555`}
          htmlFor={inputID}
        >
          {getText(
            values.profileImage ? 'LABEL_EDIT_PROFILE' : 'LABEL_ADD_PROFILE'
          )}
        </label>
        {false ? <img src={EditOutlineSvg} alt='edit-outline' /> : null}
      </div>

      {/* Upload Section */}
      <div className='flex items-center justify-between'>
        <p className='text-gray text-[15px] leading-[20px] font-normal'>
          {!imageSrc
            ? 'Click to upload a new image'
            : 'Modify the existing image'}
        </p>

        {/* Clickable Label for Image Upload */}
        <label htmlFor={inputID} className='cursor-pointer flex justify-end'>
          {!imageSrc ? (
            <div className='bg-LIGHT_BLUE_E8F1FF p-4 w-12 h-12 flex items-center justify-center rounded-[2px]'>
              <img src={AddSvg} alt='AddSvg' />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt='Profile'
              className='h-[50px] w-[50px] rounded-[5px] object-cover'
            />
          )}
        </label>
      </div>
    </div>
  );
};

{
  /* <label htmlFor={`${inputID}`} className='cursor-pointer'>
{imageSrc ? (
  <div className='w-12 h-12'>
    <img src={imageSrc} alt='Profile' className='object-cover' />
  </div>
) : (
  <div className='bg-LIGHT_BLUE_E8F1FF p-4 w-12 h-12 flex items-center justify-center rounded-[2px] '>
    <img src={AddSvg} alt='AddSvg' />
  </div>
)}
<input
  name={name}
  type='file'
  accept='image/*'
  className='hidden'
  onChange={handleImageChange}
  id={inputID}
/>
</label>
<label
htmlFor={inputID}
className='text-[18px] font-medium leading-[23.9px] -tracking-[0.16px] cursor-pointer underline text-LIGHT_BLUE_3EB6FF'
>
{getText(
  values.profileImage ? 'LABEL_EDIT_PROFILE' : 'LABEL_ADD_PROFILE'
)}
</label> */
}
