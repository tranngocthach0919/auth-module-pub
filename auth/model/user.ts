export class User {
  constructor(
    readonly id: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly password: string,
    readonly salt: string,
    readonly status: string,
    readonly role: string,
  ) {}
}

export class UserPermission {
  constructor (
    readonly id: string,
    readonly actions: number,
    readonly user_id: string,
  ) {}
}