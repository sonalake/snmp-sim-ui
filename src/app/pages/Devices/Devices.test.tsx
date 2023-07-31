import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from 'app/utils/testUtils';

import { Devices } from './Devices';

describe('Devices', () => {
  it('should render with a loading state', async () => {
    renderWithRouter(<Devices />);
    expect(await screen.findByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('should render with data', async () => {
    renderWithRouter(<Devices />);

    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    expect(await screen.findByText('Add device')).toBeInTheDocument();
    expect(await screen.findByTestId('table-element')).toBeInTheDocument();
  });

  it('should update the table when the search filter changes', async () => {
    renderWithRouter(<Devices />);
    expect(await screen.findByTestId('devices-search')).toBeInTheDocument();
    expect(await screen.findByTestId('table-element')).toBeInTheDocument();

    expect(await screen.findAllByTestId('table-row-element')).toHaveLength(10);

    await act(async () => {
      fireEvent.change(screen.getByTestId('devices-search'), {
        target: { value: 'empty' }
      });
    });
    await waitFor(() => expect(screen.getByTestId('loading-indicator')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    expect(await screen.findAllByTestId('table-row-element')).toHaveLength(1);
  });

  it('should filter devices using additional filter options in sidebar', async () => {
    renderWithRouter(<Devices />);
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    expect(await screen.getByTestId('device-type-filter')).toBeInTheDocument();
    expect(await screen.getByTestId('device-status-filter')).toBeInTheDocument();

    userEvent.click(
      within(screen.getByTestId('device-type-filter')).getByText('OS Windows Server')
    );

    // the table will update (i.e. loading spinner, then table again)
    await waitFor(() => expect(screen.getByTestId('loading-indicator')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    userEvent.click(within(screen.getByTestId('device-status-filter')).getByText(/stopped/i));

    // the table will update (i.e. loading spinner, then table again)
    await waitFor(() => expect(screen.getByTestId('loading-indicator')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());
  });

  it('should change view of devices properly', async () => {
    renderWithRouter(<Devices />);

    expect(await screen.findByTestId('view-toggle-button')).toBeInTheDocument();

    expect(await screen.findByTestId('table-element')).toBeInTheDocument();
    expect(screen.queryAllByTestId('flowbite-card')).toHaveLength(0);

    userEvent.click(screen.getByTestId('view-toggle-button'));

    expect(await screen.queryByTestId('table-element')).toBeNull();
    expect(await screen.findAllByTestId('flowbite-card')).toHaveLength(10);

    userEvent.click(screen.getByTestId('view-toggle-button'));

    expect(await screen.findByTestId('table-element')).toBeInTheDocument();
    expect(screen.queryAllByTestId('flowbite-card')).toHaveLength(0);
  });
});
