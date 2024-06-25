import { z } from 'zod';
import {
  ErrFirstNamePattern,
  ErrFirstNameEmpty,
  ErrLastNamePattern,
  ErrLastNameEmpty,
  ErrEmailInvalid,
  ErrEmailEmpty,
  ErrPasswordPattern,
  ErrPasswordMin,
  ErrPasswordEmpty
} from '~/shared/error';

export class InsertUserDTO {
  constructor(
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly password: string,
    readonly role: string,
    readonly actions: number,
  ) { }

  validate(): void {
    const schema = z.object({
      first_name: z.string()
        .min(1, { message: ErrFirstNameEmpty.message })
        .regex(/^[A-Za-z]+$/, { message: ErrFirstNamePattern.message }),

      last_name: z.string()
        .min(1, { message: ErrLastNameEmpty.message })
        .regex(/^[A-Za-z]+$/, { message: ErrLastNamePattern.message }),

      email: z.string()
        .min(1, { message: ErrEmailEmpty.message })
        .email({ message: ErrEmailInvalid.message }),

      password: z.string()
        .min(1, { message: ErrPasswordEmpty.message })
        .min(6, { message: ErrPasswordMin.message })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, { message: ErrPasswordPattern.message }),
      actions: z.number().int().positive().max(7), // Giới hạn từ 0 đến 7
    });

    try {
      schema.parse({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        role: this.role,
        actions: this.actions
      });
    } catch (error: any) {
      throw new Error(error.errors[0].message);
    }
  }
}