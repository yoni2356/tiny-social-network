import { User } from "src/user/entities/user.entity"

export const SEED_DATA: {
    users: Omit<User, 'id'>[]
} = {
    users: [
        { name: 'John Smith', email: 'john@gmail.com' },
        { name: 'Jane Aurora', email: 'jane@yahoo.com' },
        { name: 'Bob Bera', email: 'bob.bera@hotmail.com' },
    ]
}