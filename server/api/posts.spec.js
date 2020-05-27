const { expect } = require("chai");
const request = require("supertest");
const app = require("../index");

describe("API routes", () => {
  describe("/api/posts", () => {
    const ryleeAuthor = "Rylee Paul"

    it("GET /api/posts", async () => {
      const res = await request(app)
      .get('/api/posts?tags=tech')
      .expect(200)

    expect(res.body.posts).to.be.an('array')
    expect(res.body.posts[0].author).to.be.equal(ryleeAuthor)
    });
  }); // end describe('/api/posts')
}); // end describe('API routes')
