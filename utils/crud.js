const getMany = (model) => async (req, res) => {
  try {
    const query = req.user ? { createdBy: req.user._id } : {};
    const docs = await model.find(query).sort({ createdAt: -1 });
    res.json({ data: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getOne = (model) => async (req, res) => {
  try {
    const query = req.user ? { createdBy: req.user._id } : {};
    const doc = await model.findOne({ ...query, _id: req.params.id });
    if (!doc) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const createOne = (model) => async (req, res) => {
  try {
    const created = await model.create({
      ...req.body,
      createdBy: req.user._id,
      author: req.user.name,
    });
    res.json({ data: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateOne = (model) => async (req, res) => {
  try {
    const updated = await model.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!removed) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ data: removed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const crudControllers = (model) => ({
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});

module.exports = crudControllers;
