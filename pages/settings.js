import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import CollectionLoader from "@/components/collectionLoader";
import { useRouter } from "next/router";
import { ProfileContainer } from "/Components/StyledComponents/talentPage-styledComponents";
import api from "/Components/axiosRequest";
import { Form, Input, Button, Radio, Upload, Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setWalletBalance,
  setMetaConnected,
  setWalletConnected,
  getAccountTokens,
  getMetaToken,
  getWalletToken,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
function Profile() {
  const [form] = Form.useForm();
  const [isLoad, setLoad] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const router = useRouter();
  const { profile } = router.query;
  const accountTokens = useSelector(getAccountTokens);
  console.log("accountCos", accountTokens);
  const onFinish = async (values) => {
    setLoadButton(true);
    console.log("values come from form", values);
    const data = { talentName: values.talentName, bio: values.bio };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    values.talentAvatar
      ? formData.append(
          "files.talentAvatar",
          values.talentAvatar[0].originFileObj
        )
      : "";
    values.talentBanner
      ? formData.append(
          "files.talentBanner",
          values.talentBanner[0].originFileObj
        )
      : "";
    try {
      const req = await api.put(`/talents/${`1`}`, formData);
      if (req) setLoadButton(false);
    } catch {}
  };

  useEffect(() => {
    (async function fetchingTalent() {
      if (profile != undefined) {
        setLoad(true);
      }
    })();
    setLoad(true);
  }, [profile]);
  return (
    <>
      <MainWrapper>
        {isLoad === false ? <CollectionLoader /> : ""}
        {isLoad ? (
          <div className="mt-4">
            <Row>
              <Col md={6}></Col>
              <Col md={12}>
                <h5>Edit Profile</h5>
                <div>You can set prefered display name, username and...</div>
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    label="Name"
                    required
                    name="talentName"
                    rules={[
                      {
                        required: true,
                        message: "talent name is required",
                      },
                    ]}
                  >
                    <Input placeholder="write your name" />
                  </Form.Item>
                  <Form.Item label="Bio" name="bio">
                    <Input placeholder="write about your self" />
                  </Form.Item>
                  <Form.Item
                    name="talentAvatar"
                    label="profile picture or avatar"
                    extra="use square image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload listType="picture" maxCount={1}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    name="talentBanner"
                    label="cover page"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload listType="picture" maxCount={1}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadButton}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </MainWrapper>
    </>
  );
}

export default Profile;
