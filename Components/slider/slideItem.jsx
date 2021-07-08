import {
  SliderItem,
  SliderTitle,
  SliderSubTitle,
} from "../StyledComponents/slider-styledComponents";
export default function SlideItem(props) {
  return (
    <SliderItem>
      <div>
        <SliderTitle>{props.item.categoryName}</SliderTitle>
        <SliderSubTitle>{props.item?.subtitle}</SliderSubTitle>
        <img src={props.item.categoryImage?.url} />
      </div>
    </SliderItem>
  );
}
