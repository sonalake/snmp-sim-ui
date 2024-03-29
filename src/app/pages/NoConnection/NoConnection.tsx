import { StatusDisplay } from 'app/components';

export const NoConnection = () => (
  <StatusDisplay
    icon='noConnection'
    title='No connection'
    subTitle='Please connect to a Wi-Fi network to continue.'
  />
);
