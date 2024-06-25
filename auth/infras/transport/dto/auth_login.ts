import { z } from 'zod';
import { ErrEmailEmpty, ErrEmailInvalid, ErrPasswordEmpty } from '~/shared/error';

export class LoginUserDTO {
  constructor(
    readonly email: string,
    readonly password: string
  ) {}

  validate(): void {
    const schema = z.object({
      email: z.string()
        .min(1, { message: ErrEmailEmpty.message })
        .email({ message: ErrEmailInvalid.message }),
      password: z.string().min(1, { message: ErrPasswordEmpty.message }),
    });

    try {
      schema.parse({
        email: this.email,
        password: this.password,
      });
    } catch (error: any) {
      throw new Error(error.errors[0].message);
    }
  }
}
