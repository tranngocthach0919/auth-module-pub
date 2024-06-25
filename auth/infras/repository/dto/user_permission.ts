import { DataTypes, Model, type Sequelize } from 'sequelize';

export class UserPermissionPersistence extends Model {}

export function initPermission(sequelize: Sequelize) {
  UserPermissionPersistence.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      actions: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 0
      },
      user_id: { 
        type: DataTypes.UUID, 
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserPermission',
      timestamps: true,
      tableName: 'user_permissions',
    }
  );
}
