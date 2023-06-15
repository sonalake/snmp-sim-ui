import {
  buildQueries,
  FindAllBy,
  FindBy,
  GetAllBy,
  GetBy,
  Matcher,
  MatcherOptions,
  Queries,
  QueryBy,
  queryHelpers,
} from '@testing-library/react'

const queryAllByName = (container: HTMLElement, id: Matcher, options?: MatcherOptions) =>
  queryHelpers.queryAllByAttribute('name', container, id, options)

const getMultipleErrorForName = (container: Element | null, args: unknown) =>
  `Found multiple elements with the name attribute of: ${args}`

const getMissingErrorForName = (container: Element | null, args: unknown) =>
  `Unable to find an element with the name attribute of: ${args}`

const [queryByName, getAllByName, getByName, findAllByName, findByName] = buildQueries(
  queryAllByName,
  getMultipleErrorForName,
  getMissingErrorForName,
)

export default {
  queryByName,
  queryAllByName,
  getAllByName,
  getByName,
  findAllByName,
  findByName,
}

// QueryBy<[id: Matcher, options?: MatcherOptions | undefined]>

export interface CustomQueries extends Queries {
  queryByName: QueryBy<[id: Matcher, options?: MatcherOptions]>
  queryAllByName: (container: HTMLElement, id: Matcher, options?: MatcherOptions) => HTMLElement[]
  getAllByName: GetAllBy<[id: Matcher, options?: MatcherOptions]>
  getByName: GetBy<[id: Matcher, options?: MatcherOptions]>
  findAllByName: FindAllBy<[id: Matcher, options?: MatcherOptions]>
  findByName: FindBy<[id: Matcher, options?: MatcherOptions]>
}
