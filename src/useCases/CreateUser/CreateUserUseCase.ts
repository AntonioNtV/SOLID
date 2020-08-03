
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '@entities/User'
import { IMailProvider } from 'src/providers/IMailProvider'

export class CreateUserUseCase {
  constructor (
       private usersRepository: IUsersRepository,
       private mailProvider: IMailProvider
  ) {}

  async execute (data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('User Already Exist')
    }

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe PAC',
        email: 'equipe@pac.com.br'
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p> você ja pode fazer login :D <p>'
    })
  }
}
