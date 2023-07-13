// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('@tanstack/react-table', () => ({
  getCoreRowModel: jest.fn(),
  getSortedRowModel: jest.fn(),
  useReactTable: jest.fn().mockImplementation(() => ({
    getSelectedRowModel: jest.fn().mockImplementation(() => ({ flatRows: [] })),
    getHeaderGroups: jest.fn().mockImplementation(() => []),
    getRowModel: jest.fn().mockImplementation(() => ({ rows: [] }))
  }))
}));
