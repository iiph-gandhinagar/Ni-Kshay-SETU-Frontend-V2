import { createAction } from '@nikshay-setu-v3-monorepo/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DashboardProps } from 'shared/types/src/screens/StaticContact';
import { OverlayLoader } from '../../components/Animations/Loader';
import { DashboardOverview } from '../../components/Dashboard/DashboardOverview';
import { IndiaMap } from '../../components/Dashboard/IndiaMap';
import { ModuleUsage } from '../../components/Dashboard/ModuleUsage';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';
export const Dashboard = () => {
  const [loader, setLoading] = useState(false);
  const [list, setList] = useState<DashboardProps | undefined>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      createAction<null, DashboardProps>(
        {
          method: 'GET',
          url: 'GET_DASHBOARD',
        },
        (res, data) => {
          setLoading(false);
          if (res == 200) setList(data);
        }
      )
    );
    return () => {
      setList(undefined);
    };
  }, []);
  return (
    <React.Fragment>
      {loader ? <OverlayLoader /> : null}
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <DashboardOverview
        totalActivities={list?.totalActivities}
        totalAssessment={list?.totalAssessment}
        totalSubscriber={list?.totalSubscriber}
      />

      {list?.stateWiseCount && (
        <IndiaMap
          title='Subscribers presence across State/UT'
          subscribers_presence={list?.stateWiseCount}
        />
      )}
      <ModuleUsage title='Module Usage' data={list} />
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
