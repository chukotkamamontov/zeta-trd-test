import React, { useEffect, useState } from 'react'
import useTreeMutatins from '../../hooks/useTreeMutatins'
import Modal from '../modal/Modal'
import Spinner from '../../ui/spinner/Spinner'
import { ReactComponent as ArrowRight } from '../../assets/arrow.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg'
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus-icon.svg'
import styles from './TreeNode.module.css'

const ROOT_NAME = 'chukotka'

const TreeNode = ({data, activeNode, toggleActiveNode}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [error, setError] = useState('')
  
  const {createMutation, renameMutation, removeMutation} = useTreeMutatins()

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        setIsOpenModal()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])
  
  useEffect(() => {
    if (removeMutation.error) {
      setError(removeMutation.error)
      setModalType('error')
      setIsOpenModal(true)
    }
  }, [removeMutation.error])

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const addNode = () => {
    setError(null)
    setModalType('add')
    setIsOpenModal(true)
  }
  
  const renameNode = () => {
    setError(null)
    setModalType('rename')
    setIsOpenModal(true)
  }
  
  const deleteNode = () => {
    removeMutation.mutate({treeName: ROOT_NAME, nodeId: data.id})
  }

  const getFormData = (value) => {
    if (modalType === 'add') {
      createMutation.mutate({treeName: ROOT_NAME, parentNodeId: data.id, nodeName: value})
    } 
    if (modalType === 'rename') {
      renameMutation.mutate({treeName: ROOT_NAME, nodeId: data.id, newNodeName: value})
    }
  }

  const toggleToolbar = (e) => {
    e.stopPropagation()
    toggleActiveNode(data.id)
  }
  
  return (
    <div className={styles['treeNode-wrapper']} onClick={toggleToolbar}>

      <Modal open={isOpenModal} onClose={onCloseModal} getFormData={getFormData} type={modalType} error={error}></Modal>

      <div className={styles['treeNode']}>

        {data.children.length ?
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ArrowRight/> : <ArrowDown/>}
          </button> : null
        }

        <span className={styles['treeNode-title']}>
          {createMutation.isLoading && <Spinner/>}
          {data.name === ROOT_NAME ? 'Root' : data.name}
        </span>
        
        <div className={activeNode === data.id ? styles.toolbar : styles.hide}>
          <button onClick={addNode}><PlusIcon /></button>
          {data.name !== ROOT_NAME && <button onClick={renameNode}><EditIcon /></button>}
          {data.name !== ROOT_NAME && <button onClick={deleteNode}><DeleteIcon /></button>}
        </div>

      </div>

      {(isOpen && data.children) && data.children.map((item) => {
        return <TreeNode key={item.id} data={item} toggleActiveNode={toggleActiveNode} activeNode={activeNode}/>
      })}

    </div>
  )
}

export default TreeNode