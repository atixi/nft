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
      console.log("koskash japan", data.data);
    }
    fetchingCats();
  }, []);
  const items = [
    {
      image: "/images/1.png",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
    {
      image: "/images/2.jpg",
      title: "Video Musical Animation",
      subtitle: "by Eclictic Method",
    },
    {
      image: "/images/3.gif",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
    {
      image: "/images/4.gif",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
    {
      image: "/images/5.png",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
    {
      image: "/images/6.jpg",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
    {
      image: "/images/7.gif",
      title: "AsyncArt",
      subtitle: "Programmable music",
    },
  ];
  return (
    <SliderWrapper>
      {categories.map((v, i) => (
        <SlideItem item={v} key={i} />
      ))}
    </SliderWrapper>
  );
}
