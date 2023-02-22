const BASE = 'https://test.vmarmysh.com/api.user.tree.'

export const getRootTreeNode = async (treeName) => {
    const result = await fetch(`${BASE}get?treeName=${treeName}`).then(res => res.json())
    return result
}

// https://test.vmarmysh.com/api.user.tree.node.create?treeName=chukotka&parentNodeId=513&nodeName=foo fighters
export const createTreeNode = async ({treeName, parentNodeId, nodeName}) => {
    const result = await fetch(`${BASE}node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`, {
        method: 'POST',
    })
    return result
}

export const renameTreeNode = async ({treeName, nodeId, newNodeName}) => {
    console.log('editTreeNode')
    await fetch(`${BASE}node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`, {
        method: 'POST'
    })
}

export const deleteTreeNode = async ({treeName, nodeId}) => {
    return fetch(`${BASE}node.delete?treeName=${treeName}&nodeId=${nodeId}`)
      .then(async(res) => {
        if (!res.ok) {
            const data = await res.json(); 
            return Promise.reject(data.data.message);
        }
      })
}