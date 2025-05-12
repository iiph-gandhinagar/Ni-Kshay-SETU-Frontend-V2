import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  BlockApiResponse,
  CadresByTypesApiResponse,
  CadreTypesApiResponse,
  DistrictsApiResponse,
  HealthFacilityApiResponse,
  StateApiResponse,
} from '@nikshay-setu-v3-monorepo/types';
import { store } from '../app/app';

// get CADRES Types
export const getCadresTypes = () => {
  return new Promise<CadreTypesApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, CadreTypesApiResponse>(
        {
          method: 'GET',
          url: 'CADRES_TYPES',
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};

// get CADRES
export const getCadres = (cadreType: string) => {
  return new Promise<CadresByTypesApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, CadresByTypesApiResponse>(
        {
          method: 'GET',
          url: 'CADRES_BY_TYPES',
          query: cadreType,
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};

// get states
export const getStates = () => {
  return new Promise<StateApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, StateApiResponse>(
        {
          method: 'GET',
          url: 'STATES',
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};

// get states
export const getDistricts = (stateId: string) => {
  return new Promise<DistrictsApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, DistrictsApiResponse>(
        {
          method: 'GET',
          url: 'DISTRICTS',
          query: stateId,
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};

// get states
export const getBlocks = (districtId: string) => {
  return new Promise<BlockApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, BlockApiResponse>(
        {
          method: 'GET',
          url: 'BLOCKS',
          query: districtId,
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};

// get HealthFacility
export const getHealthFacility = (blockId: string) => {
  return new Promise<HealthFacilityApiResponse>((resolve, reject) => {
    store.dispatch(
      createAction<null, HealthFacilityApiResponse>(
        {
          method: 'GET',
          url: 'HEALTH_FACILITIES',
          query: blockId,
        },
        (codeType, res) => {
          if (codeType == 200) {
            resolve(res);
          }
        }
      )
    );
  });
};
