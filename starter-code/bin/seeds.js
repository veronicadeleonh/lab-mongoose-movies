const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/starter-code", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "Lorem Ipsum sit amet",
  },
  {
    name: "Beyonce",
    occupation: "Actor",
    catchPhrase: "Lorem Ipsum sit amet",
  },
  {
    name: "Daffy Duck",
    occupation: "Actor",
    catchPhrase: "Lorem Ipsum sit amet",
  },
];

Celebrity.create(celebrities)
  .then((data) => {
    console.log(`Success! Added ${data.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
