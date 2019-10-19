export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_user',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false, freezeTableName: true }
  );
