import React, { useEffect, useState, useRef } from 'react'
import { ReactComponent as ArrowRight } from '../../assets/arrow.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg'
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus-icon.svg'
import useTreeMutatins from '../../hooks/useTreeMutatins'
import useHover from '../../hooks/useHover'
import Modal from '../modal/Modal'
import Spinner from '../../ui/spinner/Spinner'
import styles from './TreeNode.module.css'

const TreeNode = ({data}) => {

  const ref = useRef();
  const isHovering = useHover(ref);

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [error, setError] = useState('')
  
  // useEffect(() => {
  //   const close = (e) => {
  //     if(e.keyCode === 27){
  //       setIsOpenModal()
  //     }
  //   }
  //   window.addEventListener('keydown', close)
  //   return () => window.removeEventListener('keydown', close)
  // },[])
  
  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const getFormData = (value) => {
    console.log(value);
    if (modalType === 'add') {
      createMutation.mutate({treeName: 'chukotka', parentNodeId: data.id, nodeName: value})
    } 
    if (modalType === 'rename') {
      renameMutation.mutate({treeName: 'chukotka', nodeId: data.id, newNodeName: value})
    }
    if (modalType === 'error') {
      setModalType('error')
      setIsOpenModal(true)
    }
  }

  const {createMutation, renameMutation, removeMutation} = useTreeMutatins()

  useEffect(() => {
    console.log(removeMutation.error)
    setIsOpenModal(removeMutation.error)
  }, [removeMutation.error])

  const addNode = () => {
    setModalType('add')
    setIsOpenModal(true)
  }

  const renameNode = () => {
    setModalType('rename')
    setIsOpenModal(true)
  }

  const deleteNode = () => {
    removeMutation.mutate({treeName: 'chukotka', nodeId: data.id})
  }

  // console.log(data.name, !!data.children.length)

  return (
    <div className={styles['treeNode-wrapper']} ref={ref}>
      {/* <button onClick={() => setIsOpenModal(!isOpenModal)}>Open Modal</button> */}
      <Modal open={isOpenModal} onClose={onCloseModal} getFormData={getFormData} type={modalType} error={error}></Modal>
      <div className={styles['treeNode']}>
        {data.children.length ?
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ArrowRight/> : <ArrowDown/>}
          </button> : null
        }

        <span className={styles['treeNode-title']}>
          {createMutation.isLoading && <Spinner/>}
          {data.name}
        </span>
        
        <div className={isHovering ? styles.toolbar : styles.hide }>
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