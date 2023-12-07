const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EntrySchema = new Schema(
	{
		title: String,
		summary: String,
		content: String,
		cover: String,
		author: { type: Schema.Types.ObjectId, ref: 'User' },
		tags: [String],
		likes: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Entry = model('Entry', EntrySchema);

module.exports = Entry;
