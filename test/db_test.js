const chai = require('chai');

const { MongoClient } = require('mongodb');

const should = chai.should()


describe('The database', () => {
  it('the database should be reachable', async () => {
    const db = await MongoClient.connect("mongodb+srv://dbUser:Deakin2021@sit725-2021-t2-week4.9iugr.mongodb.net/obd2?retryWrites=true&w=majority", { useNewUrlParser: true });
    expect(db).to.not.be.null;
    await db.close();
  });
})