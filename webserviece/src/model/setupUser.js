const connection = require("../utilities/connections")

let userData = [
    { 
        userId: "U1001",
        firstname: "Roni",
        lastname:"paul",
        email: "roni@gmail.com",
        password: "Roni123",
    },
    { 
        userId: "U1001",
        firstname: "Bidisha",
        lastname:"poddar",
        email: "Bidisha@gmail.com",
        password: "Bidisha123",
    }
]


exports.userSetup = () => {
    return connection.getUserCollection().then((myCollection) => {
        return myCollection.deleteMany().then(() => {
            return myCollection.insertMany(userData).then((data) => {
                if (data) {
                    return "Insertion Successfull"
                } else {
                    throw new Error("Insertion failed")
                }
            })
        })

    })
}