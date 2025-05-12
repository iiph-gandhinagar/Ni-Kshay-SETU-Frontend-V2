import { createAction } from '@nikshay-setu-v3-monorepo/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WebHomePageProps } from 'shared/types/src/screens/LandingTypes';
import { LoginModal } from '../components/Account/LoginModal';
import { Banner } from '../components/Landing/Banner';
import { DownloadNikshaySetu } from '../components/Landing/DownloadNikshaySetu';
import { KeyFeature } from '../components/Landing/KeyFeature';
import { OurPartners } from '../components/Landing/OurPartners';
import { TeamInAction } from '../components/Landing/TeamInAction';
import { Testimonials } from '../components/Landing/Testimonials';
import Footer from '../components/Layouts/Footer';
import { Navbar } from '../components/Layouts/Navbar';

const LandingPage = () => {
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState({
    isOpen: false,
    isLogin: false,
  });

  useEffect(() => {
    dispatch(
      createAction<null, WebHomePageProps>({
        method: 'GET',
        url: 'WEB_HOME_PAGE',
      })
    );
  }, []);

  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <Banner
        title='Maximizing the Potential of Health System & Health Care Provider'
        description={`A digital solution providing support to health care providers in decision making and transforming knowledge into empowerment. This is an innovative and interactive learning tool enhancing the efforts to make TB free India.`}
        onSignUpClick={(login = false) =>
          setLoginModal({ isOpen: true, isLogin: login })
        }
      />
      <KeyFeature title='Key Features of Ni-kshay SETU' description={``} />
      <DownloadNikshaySetu
        title='Download Ni-kshay SETU'
        description='Stay connected to the latest TB care guidelines and resources at your fingertips. Join us in advancing TB elimination with Ni-kshay SETU today!'
      />
      <Testimonials
        title='Testimonials'
        description='Real Stories, Real Impact. Discover how Ni-kshay SETU is transforming TB care through the voices of our users.'
      />
      <OurPartners title='Our Partners' description={``} />
      <TeamInAction
        title='Team in action'
        description='Behind the Mission: Meet the dedicated team driving the fight against TB with Ni-kshay SETU.'
      />
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />

      {loginModal.isOpen && (
        <LoginModal
          isLogin={loginModal.isLogin}
          closeModal={() =>
            setLoginModal((oldState) => ({ ...oldState, isOpen: false }))
          }
          isOpen={loginModal.isOpen}
        />
      )}
    </React.Fragment>
  );
};

export default LandingPage;
