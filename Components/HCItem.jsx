import { CollectionCard, ProfileAvatarContainer, CardTitle, CardDescription, CardImageContainer } from "./StyledComponents/hotCollections-styledComponents"
import Profile from "/Components/profileAvatar";
export default function HCItem(props){

    console.log("reciev ", props.item)
    return (
        <CollectionCard>
            <CardImageContainer>
                <img src={props.item.banner_image_url}/>
            </CardImageContainer>
            <CardDescription style={{borderTop:"1px solid #ccc"}}>
                <ProfileAvatarContainer>
                    <Profile profile={props.item.profpic} size={64} tick={false} />
                </ProfileAvatarContainer>
                <CardTitle style={{padding:"0px 10px",marginTop:"-35px"}}>
                    <span>{props.item.title}</span>
                    <span>{props.item.subtitle}</span>
                </CardTitle>
            </CardDescription>
        </CollectionCard>
    );
}
