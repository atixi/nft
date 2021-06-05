import React from "react";
import Carousel from "react-elastic-carousel";
import HCItem from "./HCItem";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3,itemsToScroll: 3 },
  { width: 1024, itemsToShow:4,itemsToScroll:4 },
  { width: 1200, itemsToShow: 5,itemsToScroll:5 }
];

export default function HotCollections(props) {
    console.log("hot collection", props)
    const data = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NCcgaGVpZ2h0PSc2NCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDQxLDEpOyBzdHJva2U6cmdiYSgyMTcsMzgsNDEsMSk7IHN0cm9rZS13aWR0aDowLjMyOyc+PHJlY3QgIHg9JzI5JyB5PScxNycgd2lkdGg9JzYnIGhlaWdodD0nNicvPjxyZWN0ICB4PScyOScgeT0nMjMnIHdpZHRoPSc2JyBoZWlnaHQ9JzYnLz48cmVjdCAgeD0nMjknIHk9JzI5JyB3aWR0aD0nNicgaGVpZ2h0PSc2Jy8+PHJlY3QgIHg9JzI5JyB5PSczNScgd2lkdGg9JzYnIGhlaWdodD0nNicvPjxyZWN0ICB4PScyMycgeT0nMTcnIHdpZHRoPSc2JyBoZWlnaHQ9JzYnLz48cmVjdCAgeD0nMzUnIHk9JzE3JyB3aWR0aD0nNicgaGVpZ2h0PSc2Jy8+PHJlY3QgIHg9JzIzJyB5PScyOScgd2lkdGg9JzYnIGhlaWdodD0nNicvPjxyZWN0ICB4PSczNScgeT0nMjknIHdpZHRoPSc2JyBoZWlnaHQ9JzYnLz48cmVjdCAgeD0nMjMnIHk9JzQxJyB3aWR0aD0nNicgaGVpZ2h0PSc2Jy8+PHJlY3QgIHg9JzM1JyB5PSc0MScgd2lkdGg9JzYnIGhlaWdodD0nNicvPjxyZWN0ICB4PScxNycgeT0nMTcnIHdpZHRoPSc2JyBoZWlnaHQ9JzYnLz48cmVjdCAgeD0nNDEnIHk9JzE3JyB3aWR0aD0nNicgaGVpZ2h0PSc2Jy8+PHJlY3QgIHg9JzE3JyB5PScyMycgd2lkdGg9JzYnIGhlaWdodD0nNicvPjxyZWN0ICB4PSc0MScgeT0nMjMnIHdpZHRoPSc2JyBoZWlnaHQ9JzYnLz48cmVjdCAgeD0nMTcnIHk9JzQxJyB3aWR0aD0nNicgaGVpZ2h0PSc2Jy8+PHJlY3QgIHg9JzQxJyB5PSc0MScgd2lkdGg9JzYnIGhlaWdodD0nNicvPjwvZz48L3N2Zz4=";
    let items = [
        {id:0,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:1,profpic:data,coverpic:"/images/10.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:2,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:3,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:4,profpic:data,coverpic:"/images/10.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:5,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:6,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"},
        {id:7,profpic:data,coverpic:"/images/9.png",title:"Beeple special edition",subtitle:"ERC-721"}
    ];
    // if(props.data){
    //     items=props.data;
    // }
    return (
    
      <div style={{padding:"25px 0px"}}>
          <SectionHeading>{"Hot collections"} 💥</SectionHeading>
        <Carousel breakPoints={breakPoints} pagination={false} transitionMs={1000}>
          {items.map((item) => (
            <HCItem item={item} key={item.id}/>
          ))}
        </Carousel>
      </div>
    
    );
}

