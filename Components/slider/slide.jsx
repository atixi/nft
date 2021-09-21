import SlideItem from "./slideItem";
import { SliderWrapper } from "../StyledComponents/slider-styledComponents";
import { useState, useEffect } from "react";
import api from "/Components/axiosRequest";
import Carousel from "react-elastic-carousel";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];
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
       <Carousel
          breakPoints={breakPoints}
          pagination={false}
          transitionMs={1000}
        >
      {categories.map((v, i) => (
        <SlideItem item={v} key={i} />
      ))}
      </Carousel>
    </SliderWrapper>
  );
}
