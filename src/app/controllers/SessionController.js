import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store (resquest, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    const UserMessageError = () => {
      return response.status(401).json({ error: 'wrong password or email' })
    }

    if (!(await schema.isValid(resquest.body))) {
      UserMessageError()
    }

    const { email, password } = resquest.body

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      UserMessageError()
    }

    if (!(await user.checkPassword(password))) {
      UserMessageError()
    }

    return response.json({ id: user.id, email, name: user.name, admin: user.admin })
  }
}

export default new SessionController()
