import client from "../helpers/openSeaClient";

const getTopSellers = () => client.get();

export default {
  getTopSellers,
};
