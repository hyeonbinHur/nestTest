import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: { id: number; name: string }[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  findAll(): { id: number; name: string }[] {
    return this.users;
  }

  create(user: { name: string }): { id: number; name: string } {
    const id = this.users.length + 1;
    const newUser = { id, name: user.name };
    this.users.push(newUser);
    return newUser;
  }
}
