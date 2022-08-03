import '@testing-library/jest-dom'

jest.mock('@tanstack/react-table', () => ({
  getCoreRowModel: jest.fn(),
  getSortedRowModel: jest.fn(),
  useReactTable: jest.fn().mockImplementation(() => ({
    getSelectedRowModel: jest.fn().mockImplementation(() => ({ flatRows: [] })),
    getHeaderGroups: jest.fn().mockImplementation(() => []),
    getRowModel: jest.fn().mockImplementation(() => ({ rows: [] })),
  })),
}))
