import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import { CollectionCard, ProfileAvatarContainer, CardTitle, CardDescription, CardImageContainer } from "./StyledComponents/hotCollections-styledComponents"
import Profile from "/Components/profileAvatar";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3,itemsToScroll: 3 },
  { width: 1024, itemsToShow:4,itemsToScroll:4 },
  { width: 1200, itemsToShow: 5,itemsToScroll:5 }
];

export default function HotCollections(props) {
  const [collections, setCollections] = useState(props.data)

    useEffect(() =>{
      setCollections(props.data)
    }, [collections])
   
    return (
      <div style={{padding:"25px 0px"}}>
          <SectionHeading>{"Hot collections"} 💥</SectionHeading>
        <Carousel breakPoints={breakPoints} pagination={false} transitionMs={1000}>
          {collections && collections.map((item) => (
             <CollectionCard>
             <CardImageContainer>
                 <img style={{width: "100%"}} src={item.data[0]?.image_url}/>
             </CardImageContainer>
             <CardDescription style={{borderTop:"1px solid #ccc"}}>
                 <ProfileAvatarContainer>
                     <Profile profile={item.data[0]?.owner.profile_img_url} size={64} tick={false} />
                 </ProfileAvatarContainer>
                 <CardTitle style={{padding:"0px 10px",marginTop:"-35px"}}>
                     <span>{item.collection}</span>
                     <span>{item.data[0]?.asset_contract.schema_name}</span>
                 </CardTitle>
             </CardDescription>
         </CollectionCard>
          
          ))}
        </Carousel>
      </div>
    );
}

