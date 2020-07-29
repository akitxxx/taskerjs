export default (req, res) => {
  res.status(200).json({ message: `you requested for ${req.query.name} ` });
 };