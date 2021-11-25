import { AxiosResponse } from 'axios'
import { IModalFunctionParams } from 'src/components/ExcludeModal'
import { api } from 'src/services/api'

export async function handleMultipleDelete({
  checkedFields
}: IModalFunctionParams): Promise<AxiosResponse> {
  const filteredIds = checkedFields?.filter(
    item => typeof item !== 'boolean'
  ) as Record<string, unknown>[]

  console.log(filteredIds)

  const onlyIds = filteredIds?.map(order => {
    return { id: order.id }
  })

  console.log(onlyIds)

  return api.delete('/api/deleteOrders', {
    data: onlyIds
  })
}
