import request from "./axios";

export const fetchOne = (tokenAddress, tokenId) => {
  console.log("feching single nft");
  return request(`nfts/${tokenId}/${tokenAddress}`, {
    method: "GET",
  });
};

export const fetchBundle = async (maker, slug) => {
  console.log("feching bundle");
  return await request(`nfts/bundle/single/${maker}/${slug}`, {
    method: "GET",
  }).catch(function (error) {
    return error;
  });
};
export const fetch = async (target) => {
  return await request.get(target, {
    method: "GET",
  });
};

export const post = async (url, data) => {
  return request.post(url, data);
};

// export const post = async (url, data) => {
//   return request
//     .post(url, data)
//     .then(function (response) {
//       return {
//         success: true,
//         response: response,
//       };
//     })
//     .catch(function (e) {
//       console.log(e);
//       return {
//         success: false,
//         message: e,
//       };
//     });
// };
