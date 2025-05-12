import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AboutUsOverview } from '../../components/AboutUs/AboutUsOverview';
import { Contact } from '../../components/AboutUs/Contact';
import { FAQ } from '../../components/AboutUs/FAQ';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';

export const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <AboutUsOverview title='About us' />
      <FAQ title='Frequently Asked Questions' description='FAQ description' />
      <Contact title={`Let’s stay connected`} description='' />
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
