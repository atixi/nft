import { SearchWrapper } from "./StyledComponents/header-styledComponents";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Search(props) {
  const router = useRouter();
  function handleLiveSearch(e) {
    console.log("Live Search Handled", e.target.value);
  }
  function handleSearch(e) {
    console.log("search handled", e.target.value);
    e.preventDefault();
    router.push(`search?query=${e.target.value}`);
  }
  const [search, setSearch] = useState();

  useEffect(() => {}, []);
  return (
    <SearchWrapper>
      <SearchOutlined style={{ marginRight: "10px", color: "inherit" }} />
      <input
        placeholder="Search by creator, collections or NFT"
        onChange={(e) => handleLiveSearch(e)}
        onKeyPress={(e) => handleSearch(e)}
      />
    </SearchWrapper>
  );
}
