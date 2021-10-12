import withSession from "../../lib/session"

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  console.log(user)
  if (user) {
    console.log("fired1")
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    console.log("fired 2")
    res.json({
      isLoggedIn: false,
    });
  }
});