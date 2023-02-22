import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getRootTreeNode } from "../../services/tree"
import Spinner from "../../ui/spinner/Spinner"
import TreeNode from "../treeNode/TreeNode"
import Modal from "../modal/Modal"

// const root = 'C9232B85-AD10-459C-A44F-70CA30C60E5F'
// const root1 = 'Root'
// const GUID = 'chukotka'

function Tree() {
  
  const {data, isLoading, isSuccess} = useQuery({
    queryFn: () => getRootTreeNode('chukotka'),
    queryKey: ['node-all']
  }) 

  if (isLoading) return <Spinner/>

  return (
    <div>
      {/* <Spinner/> */}
      {isSuccess && <TreeNode data={data} treeName={data.name}/>}      
    </div>
  )
}

export default Tree
