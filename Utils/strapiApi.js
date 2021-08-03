import request from "./axios";
export const fetchOne = async (tokenAddress, tokenId) => {
  console.log("feching single nft")

  return await request(`nfts/${tokenId}/${tokenAddress}`, {
    method: "GET",
  })
    .then((res) => res)
    .catch(function (error) {
      return "error";
    });
};
export const fetchBundle = async (maker) => {
  console.log("feching bundle")
  return await request(`nfts/bundle/single/${maker}`, {method: "GET"}).catch(function (error){return error})
}
export const fetch = async (target) => {
  return await request(target, {
    method: "GET",
  })
  .then((res) => res)
  .catch(function (error) {
    return "error";
  }); 
};  

export const post = async (url, data) => {
  return request.post(url, data);
};
      