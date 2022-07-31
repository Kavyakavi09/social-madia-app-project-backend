import userData from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const securePassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  var hash = await bcrypt.hash(password, salt);
  return hash;
};

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const existingUser = await userData.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: 'User Already exist' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await securePassword(password);

    const result = await userData.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    let token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(201).json({
      messageg: 'successfully signed up',
      token: token,
      user: result,
    });
  } catch (error) {
    console.log('something went wrong', error);
    return res.status(500).send('Internal server error');
  }
};

export const signin = async (res, req) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userData.findOne({ email: email });

    if (!existingUser)
      return res.status(401).json({ message: 'Invalid Credentials' });

    let isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    if (isPasswordMatch) {
      let token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        messageg: 'successfully logged in',
        token: token,
        user: existingUser,
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).send('Internal server error');
    console.log('something went wrong', error);
  }
};
