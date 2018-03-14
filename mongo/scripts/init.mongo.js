db = new Mongo().getDB('xpensewiz');

db.users.remove({});
db.expenses.remove({});

db.users.insert([
  {
    name: "Pragya",
    empID: 101
  },
  {
    name: "Neha",
    empID: 102
  },
  {
    name: "Vennela",
    empID: 103
  }
]);



db.expenses.insert([
  {
    empID: 101,
    expenses: []
  },
  {
    empID: 102,
    expenses: []
  },
  {
    empID: 103,
    expenses: []
  }
]);

db.users.createIndex({empID:1});
db.expenses.createIndex({empID:1});
