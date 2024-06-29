const { model, Schema } = require('mongoose');

let sug = new Schema({
    GuildID: { type: String },
    SuggestionSystem: {
        Channel: { type: String },
		Suggestions: [
		{
         AuthorID: { type: String },
		 MessageID: { type: String },
         Upvotes: { type: Number, default: 0 },
         Downvotes: { type: Number, default: 0 },
         Votes: [
            {
                VoterID: { type: String },
                Vote: { type: String },
            }
        ]
		}
	    ]
    }
})

module.exports = model('suggestion', sug);