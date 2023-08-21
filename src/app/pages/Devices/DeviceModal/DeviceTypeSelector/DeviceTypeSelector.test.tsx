import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'app/utils/testUtils';

import { DEVICE_TYPE_MODAL_TEST_ID } from './DeviceTypeModal';
import { DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID, DeviceTypeSelector } from './DeviceTypeSelector';

describe('DeviceTypeSelector', () => {
  it('should render and show a modal with a list of device types', async () => {
    renderWithProviders(
      <DeviceTypeSelector
        id='type'
        name='type'
        defaultValue={undefined}
        onChange={jest.fn()}
        onBlur={jest.fn()}
      />
    );

    expect(await screen.findByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).toBeInTheDocument();

    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).toContain('hidden');

    userEvent.click(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID));
    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).not.toContain(
      'hidden'
    );

    // if this text is shown, then we can assume the list of device types is rendering
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();
  });

  it('should allow filtering on the list of device types', async () => {
    renderWithProviders(
      <DeviceTypeSelector
        id='type'
        name='type'
        defaultValue={undefined}
        onChange={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(await screen.findByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID));
    expect(await screen.findByText('Accedian 1Gig')).toBeInTheDocument();
    expect(await screen.findByText('OS Windows Server')).toBeInTheDocument();
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();

    await act(async () => {
      userEvent.type(await screen.findByPlaceholderText('Search device types'), 'Dell');
    });

    expect(screen.queryByText('Accedian 1Gig')).not.toBeInTheDocument();
    expect(screen.queryByText('OS Windows Server')).not.toBeInTheDocument();
    expect(screen.queryByText('Dell 5448')).toBeInTheDocument();
  });

  // should handle selecting a device type
  it('should handle selecting a device type', async () => {
    const onChangeMock = jest.fn();

    renderWithProviders(
      <DeviceTypeSelector
        id='type'
        name='type'
        defaultValue={undefined}
        onChange={onChangeMock}
        onBlur={jest.fn()}
      />
    );
    expect(await screen.findByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toHaveTextContent(
      'Select device type'
    );

    userEvent.click(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID));
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(await screen.findByText('Dell 5448'));
    });

    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).toContain('hidden');

    expect(onChangeMock).toHaveBeenCalledWith('Dell 5448');
  });
});
