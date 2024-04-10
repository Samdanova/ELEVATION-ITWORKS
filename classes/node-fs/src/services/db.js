import { JsonDB, Config } from 'node-json-db';
var db;

export default function getDb() {
  if (!db) {
    db = new JsonDB(new Config('myDataBase', true, false, '/'));
  }
  return db;
}

async function storeData(path, data, returnData = false) {
  getDb().push(path, data);
  if (returnData) {
    return await getData(path);
  }
}

async function getData(path) {
  return await getDb().getData(path);
}

async function deleteData(path) {
  getDb().delete(path);
}

async function saveToArray(pathToArr, item, idKey) {
  let array = db.getData(pathToArr) || [];
  const id = item[idKey];
  if (!id) {
    throw new Error(`Item does not have ${idKey}`);
  }
  const existingIndex = array.findIndex((i) => i[idKey] === id);
  if (existingIndex !== -1) {
    throw new Error(`Item with ${idKey} ${id} already exists`);
  }
  array.push(item);
  db.push(pathToArr, array);
}
async function removeFromArray(pathToArr, id, idKey) {}
async function getArray(pathToArr, limit, page) {} //liimit 500
async function updateArray(pathToArr, id, item, idKey) {}
async function getOneFromArray(pathToArr, id) {}

export { storeData, getData, deleteData };
