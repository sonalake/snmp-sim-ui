import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '../../utils/testUtils/testUtils';

import { PageNotFound } from './PageNotFound';

describe('PageNotFound', () => {
  it('should render the component', () => {
    render(<PageNotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
