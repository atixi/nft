import { Skeleton, Space, Divider } from "antd";
function CollectionLoader() {
  return (
    <>
      <Space>
        <Skeleton.Input
          style={{ width: 1400, height: "250px" }}
          active={true}
          size={"default"}
        />
      </Space>
    </>
  );
}

export default CollectionLoader;
