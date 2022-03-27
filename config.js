const BDconfig = {
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_PORT,
};
const App = {
  port: process.env.NODE_PORT,
};

const checkA = Object.keys(BDconfig).every((key) => BDconfig[key] !== undefined && BDconfig[key] !== '');
const checkB = Object.keys(App).every((key) => App[key] !== undefined && App[key] !== '');
if (!checkA || !checkB) throw new Error('Enviroment not set, check .env file.');

module.exports = { BDconfig, App };
