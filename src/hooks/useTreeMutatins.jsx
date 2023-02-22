import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTreeNode, renameTreeNode, deleteTreeNode} from '../services/tree'

const useTreeMutatins = () => {
    const client = useQueryClient()

    const createMutation = useMutation({
      mutationFn: createTreeNode,
      onSuccess: () => {
        client.invalidateQueries(['node-all'])
      }
    })

    const renameMutation = useMutation({
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

    return {createMutation, renameMutation, removeMutation}
}

export default useTreeMutatins