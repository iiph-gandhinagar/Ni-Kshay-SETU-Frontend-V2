// File Path: components/ResourceMaterials/Index.tsx
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import DocumentsSvg from '../../assets/svg/DocumentsSvg';
import FolderSvg from '../../assets/svg/FolderSvg';
import MoreSvg from '../../assets/svg/MoreSvg';
import PDFSvg from '../../assets/svg/PDFSvg';
import VideoFileIconSvg from '../../assets/svg/VideoFileIconSvg';
import VideoSvg from '../../assets/svg/VideoSvg';
import { useLanguageObject } from '../../utils/HelperHooks';

const getIconForFileType = (fileType: any) => {
  switch (fileType) {
    case 'folder':
      return <FolderSvg />;
    case 'ppt':
      return <VideoFileIconSvg />;
    case 'pdfs':
      return <PDFSvg />;
    case 'pdf_office_orders':
      return (
        <div className='flex flex-col items-center gap-1'>
          <PDFSvg />
          <p className='text-sm text-red-600'>Orders</p>
        </div>
      );
    case 'document':
      return <DocumentsSvg />;
    case 'videos':
      return <VideoSvg />;
    default:
      return <MoreSvg />;
  }
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isScreenLoader, setScreenLoader] = useState(true);
  const [idStack, setIdStack] = useState<any[]>([]);
  const [langKey, getText, objectToValue] = useLanguageObject();

  const { error, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );

  const getResourceMaterialData = useCallback(
    (resourceId: string) => {
      dispatch(
        createAction(
          {
            method: 'GET',
            url: 'RESOURCE_MATERIAL_BY_PARENT',
            query: resourceId,
          },
          () => setScreenLoader(false)
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const resourceName = new URLSearchParams(location.search).get('name');
    if (resourceName) {
      createActivityPayloadAndSendActivity({
        module: 'Home',
        action: resourceName,
      });
    }
  }, []);

  useEffect(() => {
    const resourceId = new URLSearchParams(location.search).get('id');
    const resourceName = new URLSearchParams(location.search).get('name');
    setScreenLoader(true);
    getResourceMaterialData(resourceId as string);
    setIdStack([{ name: resourceName, id: resourceId }]);
  }, [location.search, getResourceMaterialData]);

  const onCardClick = (guidelines: any) => {
    if (guidelines?.typeOfMaterials === 'folder') {
      setIdStack((prev) => [
        ...prev,
        { name: objectToValue(guidelines?.title), id: guidelines._id },
      ]);
      getResourceMaterialData(guidelines._id);
    } else if (guidelines?.relatedMaterials?.length > 0) {
      const fileType = guidelines.relatedMaterials[0].split('.').pop();

      navigate('/content', {
        state: {
          contentType: guidelines?.typeOfMaterials,
          url: guidelines.relatedMaterials[0],
          fileType,
          header: objectToValue(guidelines?.title),
        },
      });
    }
  };

  const backAction = () => {
    if (idStack.length === 1) {
      navigate('/');
    } else {
      const lastElement = idStack[idStack.length - 2];
      setIdStack((prev) => prev.slice(0, -1));
      getResourceMaterialData(lastElement.id);
    }
  };
  const breadcrumb = idStack.map((v: any) => ({
    name: v.name,
    navigateTo: () => backAction(),
  }));

  const filteredAndSortedData =
    data?.resource_material?.resource_material_by_parent?.sort(
      (a: any, b: any) => a.index - b.index
    );

  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-white min-h-screen p-5'>
          {breadcrumb.length && (
            <div className='mb-4 flex space-x-2'>
              {[
                {
                  navigateTo: () => {
                    navigate('/more');
                  },
                  name: 'more Tools',
                },
                ...breadcrumb,
              ].map((crumb, index) => (
                <button
                  key={index}
                  className='text-sm font-medium text-gray-600 hover:text-blue-500'
                  onClick={crumb.navigateTo}
                >
                  {crumb.name}
                  {(!(index + 1 === breadcrumb?.length) && ' / ') || ''}
                </button>
              ))}
            </div>
          )}

          <div className='p-4 border-[24px] border-solid border-gray-100 rounded-2xl shadow'>
            {isScreenLoader
              ? Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className='h-10 bg-gray-200 rounded-lg mb-4 animate-pulse'
                  ></div>
                ))
              : filteredAndSortedData.map((guidelines, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer'
                    onClick={() => onCardClick(guidelines)}
                  >
                    <div className='flex items-center space-x-3'>
                      <div>
                        {getIconForFileType(guidelines?.typeOfMaterials)}
                      </div>
                      <p className='text-lg font-semibold text-blue-600'>
                        {objectToValue(guidelines?.title)}
                      </p>
                    </div>
                  </div>
                ))}

            {!isScreenLoader && filteredAndSortedData.length == 0 && (
              <p>{getText('APP_NO_DATA_FOUND')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
