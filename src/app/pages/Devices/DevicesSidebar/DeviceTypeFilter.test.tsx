import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from 'app/utils/testUtils';

import { DeviceTypeFilter } from './DeviceTypeFilter';

describe('DeviceTypeFilter', () => {
  const optionA = 'OS Windows Server';
  const optionB = 'Dell 5448';
  const onSelectionChangeMock = jest.fn();

  it('should filter devices using additional filter options in sidebar', async () => {
    renderWithRouter(<DeviceTypeFilter onSelectionChange={onSelectionChangeMock} />);

    await waitFor(() => expect(screen.getByText(optionA)).toBeInTheDocument());

    expect(await screen.getByTestId('device-type-filter')).toBeInTheDocument();

    userEvent.click(within(screen.getByTestId('device-type-filter')).getByText(optionA));

    expect(onSelectionChangeMock).toHaveBeenCalledWith([optionA]);

    userEvent.click(within(screen.getByTestId('device-type-filter')).getByText(optionB));

    expect(onSelectionChangeMock).toHaveBeenCalledWith([optionA, optionB]);

    userEvent.click(within(screen.getByTestId('device-type-filter')).getByText(optionA));

    expect(onSelectionChangeMock).toHaveBeenCalledWith([optionB]);
  });
});
