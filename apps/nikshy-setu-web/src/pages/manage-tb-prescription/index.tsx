import { BASE_URL, Urls } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { PatientResponse } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { ManageTBPrescriptionCard } from '../../components/Cards/ManageTBPrescriptionCard';
import { ManageTBNotes } from '../../components/ManageTB/ManageTBNotes';

const ManageTBPrescription = () => {
  const location = useLocation();
  const store: PatientResponse = location.state;

  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!store) {
      navigate('/manage-tb-form');
    }
  }, []);

  const GenerateNewPrescriptionClick = () => {
    navigate('/manage-tb-form');
  };

  const downloadPdf = async () => {
    const fileUrl = BASE_URL + Urls.DOWNLOAD_PRESCRIPTION;
    const body = JSON.stringify({ prescription: store.data });

    try {
      const res = await fetch(fileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token')}`,
        },
        body,
      });

      createActivityPayloadAndSendActivity({
        module: 'ManageTB India',
        action: 'download_prescription',
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch. Status: ${res.status}`);
      }

      // Convert ReadableStream to File
      const reader = res.body.getReader();
      const chunks = [];
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) {
          chunks.push(value);
        }
        done = streamDone;
      }

      const blob = new Blob(chunks, { type: res.headers.get('content-type') });
      const file = new File([blob], 'prescription.pdf', {
        type: res.headers.get('content-type'),
      });

      // Optionally trigger download (for example, in a browser)
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url); // Free memory
    } catch (error) {}
  };

  const sendEmail = () => {
    dispatch(
      createAction(
        {
          method: 'POST',
          url: 'EMAIL_PRESCRIPTION',
          data: { prescription: store.data },
        },
        (code) => {
          if (code === 200) {
            alert(
              'We just sent it to your WhatsApp. Check it out when you get a chance!'
            );
          }
        }
      )
    );
  };

  const sendWhatApp = () => {
    dispatch(
      createAction(
        {
          method: 'POST',
          url: 'SEND_PRESCRIPTION',
          data: { prescription: store.data },
        },
        (code) => {
          if (code === 200) {
            alert(
              'We just sent it to your WhatsApp. Check it out when you get a chance!'
            );
          }
        }
      )
    );
  };

  return (
    <React.Fragment>
      {store && (
        <>
          <ManageTBPrescriptionCard
            clickEvents={{ downloadPdf, sendEmail, sendWhatApp }}
            patientData={store}
          />
          <ManageTBNotes
            notes={store.data.notes.split('\n')}
            onClick={GenerateNewPrescriptionClick}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ManageTBPrescription;
