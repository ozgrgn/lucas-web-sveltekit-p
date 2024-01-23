import ENV from '$src/env';

import mongoose from 'mongoose';

console.log('connect before');
mongoose.connect(ENV.DATABASE.connection_url).catch((err) => {
	console.error(err);
	console.error("Can't connect to Mongo");
});

export default mongoose;
