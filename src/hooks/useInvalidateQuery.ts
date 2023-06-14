import { useQueryClient } from 'react-query'
import { QueryKey } from '../api/query-keys'

export function useInvalidateQuery(queryKey: QueryKey | Array<QueryKey | string | number | undefined>) {
  const queryClient = useQueryClient()
  const invalidateQuery = () => queryClient.invalidateQueries({ queryKey })

  return { invalidateQuery }
}
