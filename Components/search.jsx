import {SearchWrapper} from "./StyledComponents/header-styledComponents";
import {SearchOutlined } from "@ant-design/icons";

export default function Search(props){

    return (
        <SearchWrapper>
            <SearchOutlined style={{marginRight: "10px", color: "inherit"}} />
            <input placeholder="Search Rim"/>
        </SearchWrapper>
    );
}