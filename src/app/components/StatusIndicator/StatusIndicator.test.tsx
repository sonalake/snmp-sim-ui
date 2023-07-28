import { render, screen } from '@testing-library/react';

import { StatusIndicator } from './StatusIndicator';

describe('StatusIndicator', () => {
  const testId = 'status';

  it('should have the correct color and display value if active', () => {
    const activeText = 'Active';

    render(<StatusIndicator title={activeText} isActive={true} />);

    expect(screen.getByText(activeText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveStyle('background-color: rgb(222 247 236);');
  });

  it('should have the correct color and display value if inactive', () => {
    const inActiveText = 'Inactive';

    render(<StatusIndicator title={inActiveText} isActive={false} />);

    expect(screen.getByText(inActiveText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveStyle('background-color: rgb(243 244 246);');
  });
});
