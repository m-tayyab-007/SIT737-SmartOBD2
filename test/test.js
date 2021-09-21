const {expect} = require("chai");
const request = require("request");

describe("test01", () => {
  const url = "http://localhost:8080";
  it("returns status 200 to check if api works", (done) => {
    request(url, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  }); 
  
});