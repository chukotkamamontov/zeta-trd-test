import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTreeNode, renameTreeNode, deleteTreeNode} from '../services/tree'

const useTreeMutatins = () => {
    const client = useQueryClient()

    const {mutate: create, isLoading: isLoadingCreate} = useMutation({
      mutationFn: createTreeNode,
      onSuccess: () => {
        client.invalidateQueries(['node-all'])
      }
    })

    const {mutate: rename} = useMutation({
      mutationFn: renameTreeNode,
      onSuccess: () => {
        client.invalidateQueries(['node-all'])
      }
    })

    const removeMutation = useMutation({
      mutationFn: deleteTreeNode,
      onSuccess: () => {
        client.invalidateQueries(['node-all'])
      },
    })

    return {create, rename, isLoadingCreate, removeMutation}
}

export default useTreeMutatins