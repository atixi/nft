import { SearchWrapper } from "./StyledComponents/header-styledComponents";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Search(props) {
  const [submit, setSubmit] = useState();
  const router = useRouter();
  function handleLiveSearch(e) {
    setSubmit(e.target.value);
  }
  function submitClick() {
    router.push(`search?query=${submit}`);
  }
  function handleSearch(e) {
    if (e.charCode === 13) {
      router.push(`/search?query=${e.target.value}`);
    }
  }

  useEffect(() => {}, []);
  return (
    <SearchWrapper>
      <SearchOutlined
        onClick={(e) => {
          submitClick();
        }}
        style={{ marginRight: "10px", color: "inherit" }}
      />
      <input
        placeholder="Search by creator, collections or NFT"
        onChange={(e) => handleLiveSearch(e)}
        onKeyPress={(e) => handleSearch(e)}
      />
    </SearchWrapper>
  );
}
