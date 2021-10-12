
import request from "../../Utils/axios"
export default withSession(async (req, res) => {
  const { username, password } = await req.body;
  try {
    // const { username, password } = params;
    const { data } = await request("auth/local", {
      method: "POST",
      data: { identifier: username, password },
    });
    if (data && data.user && data.user.id) {
      const user = { isLoggedIn: true, jwt: data.jwt };
      req.session.set("user", user);
      await req.session.save();
      res.json(user);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});