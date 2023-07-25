import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken';

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body);


      const { email, password } = request.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (!(await user.checkPassword(password))) {
        throw new Error('Wrong password');
      }

      return response.json({
        id: user.id,
        email,
        name: user.name,
        admin: user.admin,
        token: jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        ),
      });
    } catch (error) {
      return response.status(401).json({ error: 'Authentication failed' });
    }
  }
}

export default new SessionController();
