const { Schema, model } = require("mongoose");


const userSchema = new Schema({
	username: { type: String, required: true ,unique: true,minlength: [4,'Username must be at least 4 characters long']},
	hashedPassword: { type: String, required: true },
	likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],

	avatar: {
		type: String,
		default: 'https://pngimg.com/uploads/wojak/wojak_PNG109605.png'
	  }
});

userSchema.index(
	{ username: 1 },
	{
		collation: {
			locale: "en",
			strength: 2,
		},
	}
);

const User = model("User", userSchema);

module.exports = User;