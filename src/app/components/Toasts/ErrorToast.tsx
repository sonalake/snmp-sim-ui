import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { Alert } from '../Alert';

export const ErrorToast = (err: unknown) =>
  toast(
    <Alert
      color='failure'
      message={err instanceof Error ? err.message : ''}
      additionalContent={
        <>
          {err instanceof AxiosError && (
            <>
              <span>{(err as AxiosError).code}:</span>
              <br />
              <span>{(err as AxiosError<{ error: string }>)?.response?.data?.error}</span>
            </>
          )}
        </>
      }
    />
  );
