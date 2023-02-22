import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getRootTreeNode } from "../../services/tree"
import Spinner from "../../ui/spinner/Spinner"
import TreeNode from "../treeNode/TreeNode"

function Tree() {
  
  const {data, isLoading, isSuccess} = useQuery({
    queryFn: () => getRootTreeNode('chukotka'),
    queryKey: ['node-all']
  }) 

  const [activeNode, setActiveNode] = useState(null)

  const toggleActiveNode = (id) => {
    setActiveNode(id)
  }

  if (isLoading) return <Spinner/>

  return (
    <div>
      {isSuccess && <TreeNode data={data} treeName={data.name} activeNode={activeNode} toggleActiveNode={toggleActiveNode}/>}      
    </div>
  )
}

export default Tree
