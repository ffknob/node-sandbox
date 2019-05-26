const usersData = require("../../data/users.json");

const resolvers = {
  users: () => {
    return usersData;
  },

  createUser: args => {
    /*
        const userInput = args.userInput;

        return User
            .findOne({ email: userInput.email })
            .then(user => {
                if (user) {
                    throw new Error('User exists.');
                }

                return bcrypt.hash(userInput.password, 12);
            })
            .then(hashedPassword => {
                const newUser= new User({
                    email: userInput.email,
                    password: hashedPassword,
                    name: userInput.name,
                    created: new Date(userInput.created)
                });
        
                return newUser.save();
            })
            .then(result => {
                return { ...result._doc, _id: result.id, password: null };
            })
            .catch(err => {
                throw err;
            });
            */
  }
};

module.exports = { resolvers };
