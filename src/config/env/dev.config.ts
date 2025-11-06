import { access } from "fs";

export default () => ({
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  access:{
    jwt_secret:process.env.JWT_SECRET
  }
});
