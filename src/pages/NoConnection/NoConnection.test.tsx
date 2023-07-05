import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '../../utils/testUtils/testUtils';

import { NoConnection } from './NoConnection';

describe('NoConnection', () => {
  it('should render the component', () => {
    render(<NoConnection />);

    expect(screen.getByText('No connection')).toBeInTheDocument();
  });
});
