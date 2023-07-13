import { screen } from '@testing-library/react';

import { renderWithRouter } from 'app/utils/testUtils';

import { PageNotFound } from './PageNotFound';

describe('PageNotFound', () => {
  it('should render the component', () => {
    renderWithRouter(<PageNotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
