import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { StateApiResponse } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

export function NxWelcome({ title }: { title: string }) {
  const [storedValue, setLocalStorage] = useState<string>('');
  const [asyncStorageVal, setAsyncStorageVal] = useState<string>('');
  const [cookies, setCookie] = useCookies(['token']);
  const dispatch = useDispatch();
  const storeData = async (value: string) => {
    try {
      setCookie('token', value);
    } catch (e) {
      // saving error
    }
  };
  const fetchData = async () => {
    try {
      const value = await cookies.token;

      setAsyncStorageVal((value && value) || '');
    } catch (e) {
      setAsyncStorageVal('erorr');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    html {
      -webkit-text-size-adjust: 100%;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
      line-height: 1.5;
      tab-size: 4;
      scroll-behavior: smooth;
    }
    body {
      font-family: inherit;
      line-height: inherit;
      margin: 0;
       background:#000000
    }
   `,
        }}
      />
      <div className='wrapper'>
        <div className='container'>
          <div style={{ color: '#ffffff' }}>
            <h1 style={{ color: '#ffffff' }}>
              <span> Hello there, </span>
              Welcome {title + asyncStorageVal} 👋
            </h1>
          </div>
          <span style={{ color: '#ffffff' }}>
            Storage val : {asyncStorageVal}
          </span>
          <p style={{ color: '#ffffff' }}>
            API Key: {process.env.NX_PUBLIC_API_URL}
          </p>
          <p style={{ color: '#ffffff' }}>
            Database Host: {process.env.NX_PUBLIC_URL}
          </p>
          <input
            value={storedValue}
            onChange={(v) => setLocalStorage(v.target.value)}
            style={{ color: 'black' }}
          />

          <button
            onClick={() => {
              storeData(storedValue);
              fetchData();
            }}
          >
            Save to cookies
          </button>
          <button
            onClick={() => {
              dispatch(
                createAction<null, StateApiResponse>(
                  {
                    method: 'GET',
                    url: 'STATES',
                  },
                  (v, res) => {
                    if (v === 200 && Array.isArray(res)) {
                      console.log(res);
                    }
                  }
                )
              );
            }}
          >
            Call api
          </button>
          <button onClick={() => {}}>env e</button>
        </div>
      </div>
    </>
  );
}

export default NxWelcome;
