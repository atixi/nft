import SlideItem from "./slideItem";
import { SliderWrapper } from "../StyledComponents/slider-styledComponents";
import { useState, useEffect } from "react";
import api from "/Components/axiosRequest";

export default function Slide(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories?_sort=id:ASC");
      setCategories(await data.data);
    }
    fetchingCats();
  }, []);
  return (
    <SliderWrapper>
      {categories.map((v, i) => (
        <SlideItem item={v} key={i} />
      ))}
    </SliderWrapper>
  );
}
