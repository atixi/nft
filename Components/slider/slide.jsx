import SlideItem from "./slideItem";
import { SliderWrapper } from "../StyledComponents/slider-styledComponents";
import { useState, useEffect } from "react";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default function Slide(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories");
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
