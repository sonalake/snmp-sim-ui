import { render, screen } from '@testing-library/react';

import { Select } from './Select';

const OPTIONS = [
  { label: 'test1', value: 'test 1' },
  { label: 'test2', value: 'test 2' },
  { label: 'test3', value: 'test 3' },
  { label: 'test4', value: 'test 4' }
];

describe('Select', () => {
  it('should render', async () => {
    render(
      <Select
        label='Test Select'
        id='test-select'
        name='testSelect'
        placeholder='Select from the list'
        options={OPTIONS}
        onChange={jest.fn()}
      />
    );

    expect(await screen.findByLabelText('Test Select')).toBeInTheDocument();
  });
});
