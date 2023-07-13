import { ReactElement, ReactNode } from 'react';
import { MemoryRouter, MemoryRouterProps, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

/**
 * Component rendering a fake "address bar" of the MemoryRouter. Useful for assertions in tests.
 */
const RouteLocation = () => {
  const location = useLocation();

  return (
    <div hidden>
      <input data-testid='pathname' readOnly value={location.pathname} />
      <input data-testid='search' readOnly value={location.search} />
    </div>
  );
};

const DefaultTestProviders = ({
  children,
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export function renderWithProviders(
  ui: ReactElement,
  {
    queryClient
  }: {
    queryClient?: QueryClient;
  } = {}
) {
  return render(<DefaultTestProviders queryClient={queryClient}>{ui}</DefaultTestProviders>);
}

export function renderWithRouter(
  ui: ReactElement,
  {
    queryClient,
    initialEntries
  }: {
    queryClient?: QueryClient;
    initialEntries?: MemoryRouterProps['initialEntries'];
  } = {}
) {
  return renderWithProviders(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
      <RouteLocation />
    </MemoryRouter>,
    { queryClient }
  );
}
