import { toast } from 'react-toastify';

import { Alert } from '../Alert';

export const SuccessToast = (message: string) => toast(<Alert color='success' message={message} />);
