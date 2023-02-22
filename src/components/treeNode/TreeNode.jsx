import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowRight } from '../../assets/arrow.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg'
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus-icon.svg'
import useTreeMutatins from '../../hooks/useTreeMutatins'
import Spinner from '../../ui/spinner/Spinner'

const TreeNode = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {create, rename, isLoadingCreate, removeMutation} = useTreeMutatins()

  useEffect(() => {
    if (removeMutation.error) {
      console.log(removeMutation.error)
    }
  }, [removeMutation.error])

  const addNode = () => {
    const name = prompt()
    create({treeName: 'chukotka', parentNodeId: data.id, nodeName: name})
  }

  const renameNode = () => {
    const name = prompt();
    rename({treeName: 'chukotka', nodeId: data.id, newNodeName: name})
  }

  const deleteNode = () => {
    removeMutation.mutate({treeName: 'chukotka', nodeId: data.id})
  }

  return (
    <div className='treeNode-wrapper'>
      <div className='treeNode'>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ArrowRight/> : <ArrowDown/>}
        </button>

        <span className='treeNode-title'>
          {isLoadingCreate && <Spinner/>}
          {data.name}
        </span>
        
        <div className='toolbar'>
          <button onClick={addNode}><PlusIcon /></button>
          <button onClick={renameNode}><EditIcon /></button>
          <button onClick={deleteNode}><DeleteIcon /></button>
        </div>

      </div>

      {(isOpen && data.children) && data.children.map((item) => {
        return <TreeNode key={item.id} data={item}/>
      })}

    </div>
  )
}

// export default React.memo(TreeNode, (prev, next) => prev.data.name === next.data.name)
export default TreeNode