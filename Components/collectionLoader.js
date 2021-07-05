import { Skeleton, Space, Divider } from "antd";
function CollectionLoader() {
  return (
    <>
      <Space>
        <Skeleton.Input
          style={{ width: 800, height: "250px" }}
          active={true}
          size={"default"}
        />
      </Space>
      <br />
      <Skeleton.Avatar
        style={{ margin: "0 auto" }}
        active={"false"}
        shape={"circle"}
      />
    </>
  );
}
export default CollectionLoader;
