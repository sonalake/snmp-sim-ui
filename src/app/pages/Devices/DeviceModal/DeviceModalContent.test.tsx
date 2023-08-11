import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from 'app/utils/testUtils';

import { DeviceModalContent } from './DeviceModalContent';

const CLASS_FOR_INVALID_INPUT = 'border-red-500';

enum INPUT_NAMES {
  ADDRESS = 'Address',
  NAME = 'Name',
  PORT = 'Port',
  TYPE = 'Type'
}

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

  it('show call API when submit button is clicked', async () => {
    const onCloseMock = jest.fn();
    renderWithRouter(<DeviceModalContent onClose={onCloseMock} />);
    // we have to wait for the API response for the list of devices to finish
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();

    await act(async () => {
      userEvent.selectOptions(await screen.findByLabelText(INPUT_NAMES.TYPE), 'Dell 5448');
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
    // we have to wait for the API response for the list of devices to finish
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument();
    expect(screen.queryByTestId('flowbite-alert-wrapper')).not.toBeInTheDocument();

    await act(async () => {
      // Mock API will return an error based on this value
      userEvent.type(await screen.findByLabelText(INPUT_NAMES.NAME), '400');
      userEvent.selectOptions(await screen.findByLabelText(INPUT_NAMES.TYPE), 'Dell 5448');
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
