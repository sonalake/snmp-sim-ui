// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mock-api/server';

// mock the react-table library
jest.mock('@tanstack/react-table', () => ({
  getCoreRowModel: jest.fn(),
  getSortedRowModel: jest.fn(),
  useReactTable: jest.fn().mockImplementation(() => ({
    getSelectedRowModel: jest.fn().mockImplementation(() => ({ flatRows: [] })),
    getHeaderGroups: jest.fn().mockImplementation(() => []),
    getRowModel: jest.fn().mockImplementation(() => ({ rows: [] }))
  }))
}));

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
