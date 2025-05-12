import React from 'react';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';
export const Disclaimer = () => {
  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <section className='pt-[48px] pb-20'>
        <div className='container mx-auto'>
          <h2 className='text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px] text-center'>
            Disclaimer
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: `
                                    <p align="justify">
                                    <span >
                                        <span style="color: #000000;">
                                            The application is being made available on an "as-is" basis. The developer provides no warranty or representation to that effect or that the tool will be compatible with any application or software not identified as compatible. We expressly disclaim any implied warranties of fitness for a particular purpose or non-infringement. The app's functioning is dependent on compliance by all registered users with these Terms. Accordingly, the developers disclaim all liability because of such non-compliance by other registered users. The services provided (including the self-assessment test, its results, guidance on national TB elimination program guidelines and any notifications sent to the user) are not a substitute for common prudence, medical diagnosis, or specific therapeutic and epidemiological measures necessary to combat TB.
                                            </span>
                                            </span>
                                            </p><p class="western" lang="en-US" align="justify">&nbsp;</p>`,
            }}
            className='mt-6 space-y-4'
          />
        </div>
      </section>
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
