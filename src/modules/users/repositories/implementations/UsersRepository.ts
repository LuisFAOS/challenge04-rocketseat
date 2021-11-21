import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

import { v4 as uuidv4} from 'uuid'

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {

    const newUser = {
      id: uuidv4(),
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(newUser)

    return newUser

  }

  findById(id: string | string[]): User | undefined {
    return this.users.find(user => user.id === id)
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true

    const index = this.users.findIndex(user => user.id === receivedUser.id)

    this.users[index] = receivedUser

    return receivedUser
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
