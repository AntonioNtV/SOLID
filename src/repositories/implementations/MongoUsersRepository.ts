import { IUsersRepository } from '@repositories/IUsersRepository'
import { User } from '@entities/User'

export class MongoUsersRepository implements IUsersRepository {
    private users: User[]

    constructor () {
      this.users = []
    }

    async findByEmail (email: string): Promise<User> {
      const user = this.users.find(user => {
        return user.email === email
      })

      return user
    }

    async save (user: User): Promise<void> {
      this.users.push(user)
    }
}
