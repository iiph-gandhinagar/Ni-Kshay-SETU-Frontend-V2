import { appConfig, AppConfigType } from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const useURLHook = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setSearchPrams = (pramsArray: [string, string][]) => {
    const pageURl = new URL(window.location.href);
    pramsArray.forEach(([key, value]) => {
      pageURl.searchParams.set(key, value);
    });

    navigate(`${pageURl.pathname}${pageURl.search}`, { replace: true });
  };

  const getSearchParams = (pramsArray: string[]) => {
    const pageURl = new URL(window.location.href);
    const newParamsList = pramsArray.map((key) =>
      pageURl.searchParams.get(key)
    );
    return newParamsList;
  };

  return {
    setSearchPrams,
    getSearchParams,
  };
};

type UseAccordionReturnType = [
  string,
  (id: string) => void,
  (id: string) => boolean
];
export const useAccordion = (): UseAccordionReturnType => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const isAccordionOpen = (id: string) => openAccordionId === id;

  return [openAccordionId, toggleAccordion, isAccordionOpen];
};

export const useLanguageObject = (): [
  string,
  (text: keyof AppConfigType) => AppConfigType[keyof AppConfigType],
  (obj: any) => string | undefined
] => {
  const cookies = new Cookies();
  const langKey = cookies.get('lang') || 'en';
  const languageObject = useSelector(
    (state: RootReducerStates) => state?.appContext?.data?.appTranslations
  );

  const getText = useCallback(
    (text: keyof AppConfigType) => {
      if (languageObject[text]) {
        return languageObject[text];
      }
      if (appConfig[text]) return appConfig[text];
      return text;
    },
    [languageObject]
  );

  const objectToValue = useCallback(
    (obj: any = {}) => {
      if (typeof obj === 'object') {
        if (obj[langKey]) return obj[langKey];
        return obj.en;
      }
      return undefined;
    },
    [languageObject]
  );

  return [langKey, getText, objectToValue];
};
