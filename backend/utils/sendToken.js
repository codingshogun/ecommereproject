module.exports = (user, statusCode, res) => {
  const token = user.getJwtToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now + process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      status: "successful",
      user,
      token,
    });
};
