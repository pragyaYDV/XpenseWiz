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
  },
  {
    name: "Alena",
    empID: 104
  },
  {
    name: "Shiv",
    empID: 105
  },
  {
    name: "Ryan",
    empID: 106
  },
  {
    name: "Andrew",
    empID: 107
  },
  {
    name: "Jason",
    empID: 108
  }
]);



db.expenses.insert([
  {
    empID: 101,
    trips: [],
    purchases: []

  },
  {
    empID: 102,
    trips: [],
    purchases: []
  },
  {
    empID: 103,
    trips: [],
    purchases: []
  }
]);

db.users.createIndex({empID:1});
db.expenses.createIndex({empID:1});
