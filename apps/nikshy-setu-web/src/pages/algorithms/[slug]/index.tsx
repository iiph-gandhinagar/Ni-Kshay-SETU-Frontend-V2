import { ArrowRoundedSvg, EllipseSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  getAlgorithmDataByName,
  langKeyForPlugin,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { DiagnosisDependentApiResponse } from '@nikshay-setu-v3-monorepo/types';
import {
  useAccordion,
  useLanguageObject,
  useURLHook,
} from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlgorithmNodeType } from '..';
import { LabInvestigationForm } from '../../LabInvestigation/LabInvestigationForm';
import { AlgorithmsBreadcrumb } from '../AlgorithmsBreadcrumb';
import { AlgorithmsModal } from '../AlgorithmsModal';

// ===== types ==========
type AlgorithmDataType = {
  title: string;
  children: {
    description?: string;
    icon?: string;
    nodeType: AlgorithmNodeType | 'App Screen Node';
    id: string;
    children?: AlgorithmDataType['children'];
    index: number;
    title: string;
    redirectAlgorithm?: string;
    dependentNodeID?: string;
  }[];
};

// ================
const AlgorithmView: React.FC = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug: dependentNodeID } = useParams();
  const [langKey, getText, objectToValue] = useLanguageObject();

  // search query
  const { getSearchParams } = useURLHook();
  const [AlgorithmName, nodeType] = getSearchParams(['name', 'nodeType']);

  // if algorithm not found or get algorithm data
  useEffect(() => {
    if (AlgorithmName && dependentNodeID) {
      setLoader(true);
      setData(undefined);
      dispatch(
        createAction<null, DiagnosisDependentApiResponse>(
          {
            method: 'GET',
            url: getAlgorithmDataByName[AlgorithmName].urls.dependentNode,
            query: dependentNodeID,
          },
          callBackAPi
        )
      );
    } else {
      navigate('/home');
    }
  }, [dependentNodeID]);

  // state
  const [data, setData] = useState<AlgorithmDataType | undefined>(undefined);
  const [loader, setLoader] = useState(false);

  // helper
  const callBackAPi = (
    statusCode: number,
    response: DiagnosisDependentApiResponse
  ) => {
    if (statusCode == 200) {
      // create object from array of children data
      function CreateObject(
        childrenArray: DiagnosisDependentApiResponse['children']
      ): AlgorithmDataType['children'] {
        const childrenObject: AlgorithmDataType['children'] = [];
        childrenArray
          .sort((a, b) => a.index - b.index)
          .forEach((child) => {
            const nodeType = child.nodeType as AlgorithmNodeType;
            childrenObject.push({
              description: objectToValue(child.description) || undefined,
              icon: child.icon || undefined,
              nodeType,
              id: child._id,
              children:
                nodeType == 'Linking Node'
                  ? CreateObject(child.children)
                  : undefined,
              index: child.index,
              title: objectToValue(child.title),
              redirectAlgorithm: child.redirectAlgoType || undefined,
              dependentNodeID: child.redirectNodeId || undefined,
            });
          });
        return childrenObject;
      }
      const newData: AlgorithmDataType = {
        title: objectToValue(response.title),
        children: CreateObject(response.children),
      };
      setData(newData);
      setLoader(false);
    } else {
      alert('error in fetch algorithm');
    }
  };

  const pageBreadcrumb = data ? [{ label: data.title }] : [];

  console.log({ nodeType });

  return (
    <main className='md:p-6 min-h-screen bg-white-50'>
      <AlgorithmsBreadcrumb
        tabs={[
          {
            label: langKeyForPlugin[AlgorithmName]
              ? getText(langKeyForPlugin[AlgorithmName])
              : AlgorithmName,
            link: `/algorithms?name=${AlgorithmName}`,
          },
          ...pageBreadcrumb,
        ]}
      ></AlgorithmsBreadcrumb>
      {loader && <div> loading...</div>}
      {data && <AlgorithmViewDataView data={data.children} />}

      {/* form */}
      {nodeType && nodeType == 'App Screen Node' && <LabInvestigationForm />}
    </main>
  );
};

const AlgorithmViewDataView = ({
  data,
}: {
  data: AlgorithmDataType['children'];
}) => {
  const [cmsModalOpen, setCmsModalOpen] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const [accordionID, setAccordion, isAccordionOpen] = useAccordion();
  const [linkNodeAccordionID, setLinkNodeAccordion, isLinkNodeAccordionOpen] =
    useAccordion();

  const onClickHandler = (childData: AlgorithmDataType['children'][0]) => {
    if (
      childData.nodeType == 'CMS Node' ||
      childData.nodeType == 'CMS Node(New Page)'
    ) {
      setCmsModalOpen({
        isOpen: true,
        title: childData.title,
        description: childData.description,
      });
    } else if (childData.nodeType == 'Linking Node') {
      setAccordion(childData.id);
    }
  };

  return (
    <>
      <div className='space-y-4 my-2'>
        {data.map((childData, index) => {
          const iconURL = childData.icon
            ? STORE_URL + childData.icon
            : EllipseSvg;
          const iconURLClass = childData.icon ? 'w-5 h-5' : 'w-3 h-3';
          const isLinkingNode = childData.nodeType == 'Linking Node';
          const isAccordingOpen = childData.id == accordionID;

          return (
            <div key={index} className='p-4 bg-white shadow-md rounded-md'>
              {/* header */}
              <div
                className='flex items-center justify-between cursor-pointer'
                onClick={() => onClickHandler(childData)}
              >
                <div className='text-blue-500 flex items-center space-x-2'>
                  <img
                    src={iconURL}
                    alt='Algorithm'
                    className={`${iconURLClass}`}
                  />
                  <h3 className='font-semibold text-black text-[22px]'>
                    {' '}
                    {childData.title}{' '}
                  </h3>
                </div>
                {isLinkingNode && (
                  <img
                    className={`transform transition-transform ${
                      isAccordingOpen ? 'rotate-180' : ''
                    }`}
                    src={ArrowRoundedSvg}
                  />
                )}
              </div>
              {isAccordingOpen &&
                isLinkingNode &&
                childData.children.map((childrenObject) => (
                  <AlgorithmViewDataViewLinkNode
                    isOpen={isLinkNodeAccordionOpen(childrenObject.id)}
                    setOpen={setLinkNodeAccordion}
                    data={childrenObject}
                  />
                ))}
            </div>
          );
        })}
      </div>
      {cmsModalOpen.isOpen && cmsModalOpen.description && (
        <AlgorithmsModal
          description={cmsModalOpen.description}
          title={cmsModalOpen.title}
          onClose={() =>
            setCmsModalOpen({ isOpen: false, title: '', description: '' })
          }
        />
      )}
    </>
  );
};

const AlgorithmViewDataViewLinkNode = ({
  data,
  isOpen,
  setOpen,
}: {
  data: AlgorithmDataType['children'][0];
  isOpen: boolean;
  setOpen: (id: string) => void;
}) => {
  const hasMoreChildren = data.children;
  const [linkNodeAccordionID, setLinkNodeAccordion, isLinkNodeAccordionOpen] =
    useAccordion();

  return (
    <>
      <div className='node-container py-3 !ml-2'>
        <AlgorithmViewDataViewLinkNodeTitle
          data={data}
          isOpen={isOpen}
          setOpen={() => setOpen(data.id)}
        />
        {isOpen &&
          hasMoreChildren &&
          hasMoreChildren.map((childrenObject, index) => (
            <React.Fragment key={index}>
              <AlgorithmViewDataViewLinkNode
                isOpen={isLinkNodeAccordionOpen(childrenObject.id)}
                setOpen={setLinkNodeAccordion}
                data={childrenObject}
              />
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

const AlgorithmViewDataViewLinkNodeTitle = ({
  data,
  isOpen,
  setOpen,
}: {
  data: AlgorithmDataType['children'][0];
  isOpen: boolean;
  setOpen: () => void;
}) => {
  const isRedirectNode = data.redirectAlgorithm && data.dependentNodeID;
  const isCMSNode =
    data.nodeType == 'CMS Node' || data.nodeType == 'CMS Node(New Page)';
  const [cmsModalOpen, setCmsModalOpen] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  // if new page open
  if (isRedirectNode) {
    return (
      <Link
        to={`/algorithmsView/${data.dependentNodeID}?name=${data.redirectAlgorithm}`}
        className='flex items-center justify-between bg-gray-50 rounded-lg p-4 cursor-pointer'
      >
        <h3 className='text-gray-500 font-semibold text-[16px] underline'>
          {data.title}
        </h3>
        <span className='text-gray-500 font-medium text-[20px]'>→</span>
      </Link>
    );
  }

  const onClickHandler = () => {
    if (data.nodeType == 'Linking Node') {
      setOpen();
    } else {
      setCmsModalOpen({
        isOpen: true,
        title: data.title,
        description: data.description,
      });
    }
  };

  return (
    <>
      <div
        className='flex items-center justify-between p-1 cursor-pointer'
        onClick={onClickHandler}
      >
        <div className='flex gap-2 items-center'>
          {isCMSNode && (
            <img src={EllipseSvg} alt='Algorithm' className={`w-3 h-3`} />
          )}
          {!isCMSNode && <input checked={isOpen} type='radio' readOnly />}
          <div className='text-gray-500 font-semibold text-[16px]'>
            {data.title}
          </div>
        </div>
      </div>
      {cmsModalOpen.isOpen && cmsModalOpen.description && (
        <AlgorithmsModal
          description={cmsModalOpen.description}
          title={cmsModalOpen.title}
          onClose={() =>
            setCmsModalOpen({ isOpen: false, title: '', description: '' })
          }
        />
      )}
    </>
  );
};

export default AlgorithmView;
