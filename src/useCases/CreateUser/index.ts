import { MailtrapMailProvider } from 'src/providers/implementations/MailtrapMailProvider'
import { MongoUsersRepository } from '@repositories/implementations/MongoUsersRepository'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'

const mailtrapMailProvider = new MailtrapMailProvider()
const mongoUsersRepository = new MongoUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository,
  mailtrapMailProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
