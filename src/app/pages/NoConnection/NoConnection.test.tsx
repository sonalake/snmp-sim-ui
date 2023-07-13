import { render, screen } from '@testing-library/react';

import { NoConnection } from './NoConnection';

describe('NoConnection', () => {
  it('should render the component', () => {
    render(<NoConnection />);

    expect(screen.getByText('No connection')).toBeInTheDocument();
  });
});
