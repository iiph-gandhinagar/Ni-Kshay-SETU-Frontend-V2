import {
  getAlgorithmDataByName,
  langKeyForPlugin,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { DiagnosisMasterNodeApiResponse } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlgoCard from '../../components/Cards/AlgoCard';
import { useLanguageObject, useURLHook } from '../../utils/HelperHooks';
import { AlgorithmsBreadcrumb } from './AlgorithmsBreadcrumb';
import { AlgorithmsModal } from './AlgorithmsModal';
// types
export type AlgorithmNodeType =
  | 'Linking Node'
  | 'CMS Node'
  | 'CMS Node(New Page)';
type AlgorithmDataType = {
  title: string;
  description: string;
  icon: string;
  nodeType: AlgorithmNodeType;
  id: string;
};

const Algorithm: React.FC = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  // search query
  const { setSearchPrams, getSearchParams } = useURLHook();
  const [AlgorithmName, cmsModalOpen, selectedIndex] = getSearchParams([
    'name',
    'cmsModalOpen',
    'selectedIndex',
  ]);

  // if algorithm not found or get algorithm data
  useEffect(() => {
    if (AlgorithmName) {
      setCommonState((old) => ({ ...old, loading: true }));

      const callBack = (
        statusCode: number,
        response: DiagnosisMasterNodeApiResponse
      ) => {
        if (statusCode === 200) {
          const newData = response
            .sort((a, b) => a.index - b.index)
            .map((obj) => {
              return {
                title: obj.title[langKey] ?? obj.title['en'],
                nodeType: obj.nodeType as AlgorithmNodeType,
                description: obj.description[langKey] ?? obj.description['en'],
                icon: STORE_URL + obj.icon,
                id: obj._id,
              };
            });
          setData(newData);
          setCommonState((old) => ({ ...old, loading: false }));
        } else {
          alert('error in fetch algorithm');
        }
      };

      dispatch(
        createAction<null, DiagnosisMasterNodeApiResponse>(
          {
            method: 'GET',
            url: getAlgorithmDataByName[AlgorithmName]?.urls.masterNode,
          },
          callBack
        )
      );
    } else {
      navigate('/home');
    }
  }, []);

  // state
  const [commonState, setCommonState] = useState({ loading: false });
  const [data, setData] = useState<AlgorithmDataType[]>([]);

  // helper
  const onClickHandler = (index: number) => {
    const nodeType = data[index].nodeType;
    if (nodeType == 'CMS Node' || nodeType == 'CMS Node(New Page)') {
      setSearchPrams([
        ['cmsModalOpen', 'true'],
        ['selectedIndex', index.toString()],
      ]);
    } else {
      navigate(
        `/algorithmsView/${data[index].id}?name=${AlgorithmName}&nodeType=${nodeType}`
      );
    }
  };

  const modalOnClose = () => {
    setSearchPrams([
      ['cmsModalOpen', 'false'],
      ['selectedIndex', ''],
    ]);
  };

  return (
    <main className='p-6  min-h-screen'>
      <AlgorithmsBreadcrumb
        tabs={[
          {
            label: langKeyForPlugin[AlgorithmName]
              ? getText(langKeyForPlugin[AlgorithmName])
              : AlgorithmName,
          },
        ]}
      ></AlgorithmsBreadcrumb>
      <div className=''>
        {commonState.loading && <div> loading...</div>}
        {data.map(({ icon, title }, index) => (
          <AlgoCard
            onClick={() => onClickHandler(index)}
            key={index}
            iconUrl={icon}
            title={title}
          />
        ))}
        {cmsModalOpen == 'true' && data[selectedIndex] && (
          <AlgorithmsModal
            description={data[selectedIndex].description}
            title={data[selectedIndex].title}
            onClose={modalOnClose}
          />
        )}
      </div>
    </main>
  );
};

export default Algorithm;
