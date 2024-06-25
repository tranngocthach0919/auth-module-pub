import { z } from 'zod';

export class InsertPermissionDTO {
  constructor(
    readonly actions: number,
    readonly user_id: string
  ) {}

  validate(): void {
    const schema = z.object({
      actions: z.number().int().positive().min(0).max(7), // Giới hạn từ 0 đến 7
      user_id: z.string().uuid(),
    });

    try {
      schema.parse({
        actions: this.actions,
        user_id: this.user_id
      });
    } catch (error: any) {
      throw new Error(error.errors[0].message);
    }
  }
}
