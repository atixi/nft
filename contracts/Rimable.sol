pragma solidity ^0.5.0;

import "./ERC721Tradable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Rimable NFT
 * Rimable - a contract for my non-fungible Rim Entertainment.
 */
contract Rimable is ERC721Tradable {
       string url = "";

    constructor(address _proxyRegistryAddress, string memory _n, string memory _s, string memory dataURI)
        public
        ERC721Tradable(_n, _s, _proxyRegistryAddress)
    {
        url = dataURI;
    }


    function baseTokenURI() public pure returns (string memory) {
        return "ipfs://";
    }

    // function getTokenURI(uint256 tokenId) public view returns (string memory) {
    //     return super.tokenURI(tokenId);
    // }

    // function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: transfer caller is not owner nor approved"
    //     );
    //     _setTokenURI(tokenId, _tokenURI);
    // }

    function setContractURI(string calldata uri) external {
        url = uri;
    }

    function contractURI() public view returns (string memory) {
        return url;
    }
}
