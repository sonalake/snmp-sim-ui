import { render, screen } from '@testing-library/react';

import { DataTableCheckbox } from './DataTableCheckbox';

describe('DataTableCheckbox', () => {
  it('should render the component', async () => {
    render(<DataTableCheckbox data-testid='test' />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
