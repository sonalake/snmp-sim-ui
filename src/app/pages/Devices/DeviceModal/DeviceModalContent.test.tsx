import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from 'app/utils/testUtils';

import { DEVICE_TYPE_MODAL_TEST_ID } from './DeviceTypeSelector/DeviceTypeModal';
import { DeviceModalContent } from './DeviceModalContent';
import { DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID } from './DeviceTypeSelector';

const CLASS_FOR_INVALID_INPUT = 'border-red-500';

enum INPUT_NAMES {
  ADDRESS = 'Address',
  NAME = 'Name',
  PORT = 'Port',
  TYPE = 'Type'
}

const selectDeviceType = async (deviceTypeName: string) => {
  userEvent.click(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID));

  // we have to wait for the API response for the list of devices to finish
  expect(await screen.findByText(deviceTypeName)).toBeInTheDocument();

  await act(async () => {
    userEvent.click(await screen.findByText(deviceTypeName));
  });

  expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).toContain('hidden');
};

describe('DeviceModalContent', () => {
  it('should render', async () => {
    renderWithRouter(<DeviceModalContent onClose={jest.fn()} />);

    expect(await screen.findByTestId('add-device-form')).toBeInTheDocument();
  });

  it('should show inputs as invalid', async () => {
    renderWithRouter(<DeviceModalContent onClose={jest.fn()} />);
    expect(await screen.findByTestId('add-device-form')).toBeInTheDocument();

    expect((await screen.findByLabelText(INPUT_NAMES.TYPE)).classList).not.toContain(
      CLASS_FOR_INVALID_INPUT
    );
    expect((await screen.findByLabelText(INPUT_NAMES.NAME)).classList).not.toContain(
      CLASS_FOR_INVALID_INPUT
    );
    expect((await screen.findByLabelText(INPUT_NAMES.ADDRESS)).classList).not.toContain(
      CLASS_FOR_INVALID_INPUT
    );
    expect((await screen.findByLabelText(INPUT_NAMES.PORT)).classList).not.toContain(
      CLASS_FOR_INVALID_INPUT
    );

    await act(async () => {
      userEvent.clear(await screen.findByLabelText(INPUT_NAMES.NAME));
      userEvent.tab();
    });
    expect((await screen.findByLabelText(INPUT_NAMES.NAME)).classList).toContain(
      CLASS_FOR_INVALID_INPUT
    );

    await act(async () => {
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.ADDRESS), 'wrong format');
      userEvent.tab();
    });
    expect((await screen.findByLabelText(INPUT_NAMES.ADDRESS)).classList).toContain(
      CLASS_FOR_INVALID_INPUT
    );

    await act(async () => {
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.PORT), '123');
      userEvent.tab();
    });
    expect((await screen.findByLabelText(INPUT_NAMES.PORT)).classList).toContain(
      CLASS_FOR_INVALID_INPUT
    );
  });

  it('should show another modal when selecting a device type', async () => {
    renderWithRouter(<DeviceModalContent onClose={jest.fn()} />);
    expect(await screen.findByTestId('add-device-form')).toBeInTheDocument();

    expect(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toHaveTextContent(
      'Select from the list'
    );

    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).toContain('hidden');
    userEvent.click(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID));
    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).not.toContain(
      'hidden'
    );

    // we have to wait for the API response for the list of devices to finish
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(await screen.findByText('Dell 5448'));
    });

    expect((await screen.findByTestId(DEVICE_TYPE_MODAL_TEST_ID)).classList).toContain('hidden');

    expect(screen.getByTestId(DEVICE_TYPE_SELECTOR_BUTTON_TEST_ID)).toHaveTextContent('Dell 5448');
  });

  it('show call API when submit button is clicked', async () => {
    const onCloseMock = jest.fn();
    renderWithRouter(<DeviceModalContent onClose={onCloseMock} />);

    await selectDeviceType('Dell 5448');
    await act(async () => {
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.NAME), 'Example Name');
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.ADDRESS), '123.123.123.123');
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.PORT), '1234');
    });

    expect(screen.getByTestId('device-modal-submit-btn')).not.toBeDisabled();

    await act(() => {
      userEvent.click(screen.getByTestId('device-modal-submit-btn'));
    });

    expect(onCloseMock).toBeCalled();
  });

  it('should handle API errors', async () => {
    const onCloseMock = jest.fn();
    renderWithRouter(<DeviceModalContent onClose={onCloseMock} />);

    expect(screen.queryByTestId('flowbite-alert-wrapper')).not.toBeInTheDocument();

    await selectDeviceType('Dell 5448');
    await act(async () => {
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.NAME), '400');
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.ADDRESS), '123.123.123.123');
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.PORT), '1234');
    });

    expect(screen.getByTestId('device-modal-submit-btn')).not.toBeDisabled();

    await act(() => {
      userEvent.click(screen.getByTestId('device-modal-submit-btn'));
    });

    expect(onCloseMock).not.toBeCalled();

    expect(await screen.findByTestId('flowbite-alert-wrapper')).toBeInTheDocument();
  });
});
