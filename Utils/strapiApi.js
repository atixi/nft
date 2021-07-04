import request from "./axios"
export const fetchUsers = async () => {
    return await request(`nfts`, {
        method: 'GET',
    }).then(res => res)
}
export const fetchNft = async (tokenAddress, tokenId) => {
    return await request(`nfts/${tokenId}/${tokenAddress}`, {
        method: 'GET',
    }).then(res => res).catch(
        function (error) {
            return "error";
        }
      )
}