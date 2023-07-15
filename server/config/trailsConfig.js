const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://kaiiemsawat:Kinkin3710@cluster0.48awedd.mongodb.net/trails?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Established a connection to the database"))
    .catch((err) =>
        console.log(
            "Something went wrong when connecting to the database ",
            err
        )
    );
