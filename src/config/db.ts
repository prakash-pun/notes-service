import { Connection, createConnection, getConnection } from "typeorm";
import ormconfig from "./ormconfig";

export const DBConnect = async () => {
  let connection: Connection;

  try {
    connection = getConnection();
  } catch (e) {
    console.log("initial connection")
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ormconfig);
    }
    console.log("database connected");
  } catch (e) {
    console.log("database connection failed");
    console.log(e);
    throw e;
  }
};

export const TryDBConnect = async (onError: Function, next?: Function) => {
  try {
    await DBConnect();
    if (next) {
      next();
    }
  } catch (e) {
    onError();
  }
};
