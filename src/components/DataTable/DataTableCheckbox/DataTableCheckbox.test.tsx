import React from 'react';

import { render, screen } from '../../../utils/testUtils/testUtils';

import { DataTableCheckbox } from './DataTableCheckbox';

describe('DataTableCheckbox', () => {
  it(`should render the component`, async () => {
    render(<DataTableCheckbox data-testid='test' />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
