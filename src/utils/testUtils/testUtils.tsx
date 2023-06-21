import { getQueriesForElement, queries, render, RenderOptions, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import React, { ReactElement } from 'react'

import { MemoryRouter } from 'react-router-dom'

import { QueryProvider } from '../../context/query-context'
import customQueries, { CustomQueries } from './custom-query'

const customRender = <
  Q extends CustomQueries & typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
>(
  ui: ReactElement,
  initialReduxState?: unknown,
  options?: RenderOptions<Q, Container>,
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <QueryProvider>{children}</QueryProvider>
      </MemoryRouter>
    ),
    queries: { ...queries, ...customQueries },
    ...options,
  })
}

const customScreen = {
  ...screen,
  ...getQueriesForElement<CustomQueries>(document.body, customQueries),
}

export { customScreen as screen, customRender as render, waitFor, userEvent }
