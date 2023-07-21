import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEVICES } from 'mock-api/data/devices';

import { renderWithRouter } from 'app/utils/testUtils';

import { Devices } from './Devices';

describe('Devices', () => {
  // let baseApiMock: MockAdapter;

  // beforeEach(() => {
  //   baseApiMock = new MockAdapter(baseApi);
  //   //   baseApiMock.onGet('api/devices').reply(200, mockDevices);
  // });

  // afterEach(() => {
  //   baseApiMock.restore();
  // });

  it('should render the component', async () => {
    renderWithRouter(<Devices />);

    expect(await screen.findByText('Add device')).toBeInTheDocument();
  });

  it('should render the table rows', async () => {
    renderWithRouter(<Devices />);
    expect(await screen.findByText(DEVICES[0].type)).toBeInTheDocument();
  });

  // @TODO - revise this test after Sidebar refactoring
  // it('should show left panel and selection of device and status working', async () => {
  //   renderWithRouter(<Devices />);
  //   expect(await screen.findByText('Device Types')).toBeInTheDocument();
  //   expect(await screen.findByText('OS Windows Server')).toBeInTheDocument();
  //   expect(await screen.findByText('Dell 5448')).toBeInTheDocument();
  //   expect(await screen.findAllByText('1 device')).toHaveLength(2);

  //   userEvent.click(screen.getByText('OS Windows Server'));
  //   await waitFor(() => {
  //     expect(baseApiMock.history.get).toHaveLength(3);
  //   });

  //   await waitFor(() => {
  //     expect(baseApiMock.history.get[2].params).toEqual({
  //       page: 1,
  //       page_size: 10,
  //       types: ['OS Windows Server'],
  //       status: 'all',
  //       search: ''
  //     });
  //   });

  //   expect(await screen.findByText(/stopped/i)).toBeInTheDocument();

  //   userEvent.click(screen.getByText(/stopped/i));
  //   await waitFor(() => {
  //     expect(baseApiMock.history.get[3].params).toEqual({
  //       page: 1,
  //       page_size: 10,
  //       types: ['OS Windows Server'],
  //       status: 'stopped',
  //       search: ''
  //     });
  //   });
  // });

  it('should change view of devices properly', async () => {
    renderWithRouter(<Devices />);
    expect(await screen.findByTestId('view-toggle-button')).toBeInTheDocument();
    expect(screen.queryAllByTestId('flowbite-card')).toHaveLength(0);
    userEvent.click(screen.getByTestId('view-toggle-button'));
    // returning mocked data - in devices.api.ts
    expect(await screen.findAllByTestId('flowbite-card')).toHaveLength(10);
  });
});
