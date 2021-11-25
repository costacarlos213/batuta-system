import { AxiosResponse } from 'axios'
import { IModalFunctionParams } from 'src/components/ExcludeModal'
import { api } from 'src/services/api'

export async function handleMultipleVendorDelete({
  checkedFields
}: IModalFunctionParams): Promise<AxiosResponse> {
  const filteredIds = checkedFields?.filter(
    item => typeof item !== 'boolean'
  ) as Record<string, unknown>[]
  const onlyIds = filteredIds?.map(order => {
    return { id: order.id }
  })

  console.log(checkedFields)

  return api.delete('/api/deleteVendors', {
    data: onlyIds
  })
}
