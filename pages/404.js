import {Result, Button} from "antd"
import Link from "next/link"
export default function Custom404() {
    return <Result
            status="404"
            title="Page not found!"
            subTitle="The page you are looking for is not found"
            extra={[
              <Link key={"goBack"} href={"/"}>
                <a>
                  <Button>{"Back to home"}</Button>
                </a>
              </Link>,
            ]}
          />
  }