
import withSession from '../../lib/session'
import request from '../../Utils/axios'
export default withSession(async (req, res) => {
  try {
    console.log(req.body)
    const { identifier, password } = req.body;
    // const { username, password } = params;
    const { data } = await request("auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { identifier, password },
    });

    if ( data && data.user && data.user.id) {
      const user = { isLoggedIn: true, user: data.user, jwt: data.jwt };
      req.session.set("user", user);
      await req.session.save();
      res.json(user);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});