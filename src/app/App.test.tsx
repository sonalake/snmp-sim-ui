import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('should render', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    // Devices is the default page
    expect(await screen.findByText('Add device')).toBeInTheDocument();
    expect(await screen.findByTestId('table-element')).toBeInTheDocument();
  });

  it('should handle offline and online events', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());

    // go offline
    fireEvent.offline(window);
    await waitFor(() => expect(screen.getByText('No connection')).toBeInTheDocument());

    // come back online
    fireEvent.online(window);
    await waitFor(() => expect(screen.getByTestId('table-element')).toBeInTheDocument());
  });

  it('should update styles when the theme toggle button is clicked', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('dark-theme-toggle')).toBeInTheDocument());

    // using the logo src to determine if we are in dark mode or not
    // - currently the only conditional theme change (everything else is css conditionals)

    // logo-black = light theme
    expect(screen.getByTestId('app-logo').getAttribute('src')).toContain('logo-black');

    userEvent.click(screen.getByTestId('dark-theme-toggle'));

    // logo-white = dark theme
    expect(screen.getByTestId('app-logo').getAttribute('src')).toContain('logo-white');
  });
});
