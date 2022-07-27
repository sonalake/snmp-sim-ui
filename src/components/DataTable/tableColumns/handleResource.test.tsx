import { getOperationProperties } from './handleResource'

describe('getOperationProperties', () => {
  it(`should generate the correct operation properties`, async () => {
    const messages = getOperationProperties({ resource: 'agents' })

    expect(messages.post).toStrictEqual({ url: `/api/agents`, message: `Agent created!` })
  })
})
