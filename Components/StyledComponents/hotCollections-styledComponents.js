import styled from "styled-components";

export const CollectionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  margin-right: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
  overflow: hidden;
`;
export const CardDescription = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
  flex: 1;
  font-weight: 700;
`;
export const CardTitle = styled.div`

    span{
    font-weight: 700;
    font-size: 20px;
    display: block;
        &:last-child{
            font-size: 16px;
            font-weight: 900;
            color:#aaa;
    }
`;
export const ProfileAvatarContainer = styled.div`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin: 0px auto;
  overflow: hidden;
  z-index: 9;
  transform: translateY(-50%);
  img {
    width: 100%;
    height: 100%;
  }
`;
export const CardImageContainer = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
  flex: 1;
  font-weight: 700;
  img {
    height: 100%;
    width: auto;
    // transform: translateX(-50%);
    // left: 50%;
    position: relative;
    margin: 0px auto;
  }
`;
