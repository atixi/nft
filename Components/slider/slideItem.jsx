import {
  SliderItem,
  SliderTitle,
  SliderSubTitle,
} from "../StyledComponents/slider-styledComponents";
import Link from "next/link";
export default function SlideItem(props) {
  return (
    <SliderItem>
      <Link href={`category/${props.item.slug}`}>
        <div>
          <SliderTitle>{props.item.categoryName}</SliderTitle>
          <SliderSubTitle>{props.item?.subtitle}</SliderSubTitle>
          <img src={props.item.categoryImage?.url} />
        </div>
      </Link>
    </SliderItem>
  );
}
