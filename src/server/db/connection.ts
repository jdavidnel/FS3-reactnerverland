import * as mongoose from 'mongoose';

export class DbConnection {

  constructor() {

  }

  public static startMongoDB(): boolean {
    let connection: boolean = false;

    mongoose.connect('mongodb://localhost/blog', function (err) {
      if (!err) { connection = true; } else { throw err; }
    });
    return connection;
  }
}
mongoose.connect('mongodb://localhost/blog', function (err) {
  if (err) { throw err; }
});