const User = require('./user.dao');
const jwt = require('jsonwebtoken');
const secret_key = 'Express_Mongoose';
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pass_hash = await bcrypt.hash(password, salt);
    const user = { email, pass_hash };
    await User.create(user);
    res.status(200).json({ message: `Berhasil membuat user baru!` });
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).json({ message: error.message || `Terjadi kesalahan.` });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    const { pass_hash } = user;

    if (!(await bcrypt.compare(password, pass_hash)))
      return res.status(400).json({ message: `Email dan password tidak cocok.` });

    const payload = { email };
    const token = jwt.sign(payload, secret_key, { expiresIn: '12h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
