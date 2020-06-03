const getUser = (req, res) => {
  res.json({ data: req.user });
};

module.exports = { getUser };
