/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');
const agent = session(app);

const activityTest = {
    "name": "Actividad de Test",
    "difficulty": "1",
    "duration": 25,
    "season": [
      "Summer"
    ],
    "country": [
      "China"
    ]
}; 

describe('Activity Get route ', () => {  
it("Creates test activity", async () => {
  const response = await agent.post("/activities").send(activityTest)
  .expect((response)=> {
  expect(response.status).equal(200);
  });      
});

  
it("Gets test activity data",  () => {
    return agent.get("/activities?name=actividad")
    .expect((res)=> {
     /*  console.log(res.body) */
     expect(res.body[0].name).equal("Actividad de Test");
     expect(res.body[0].difficulty).equal("1");
     expect(res.body[0].duration).equal(25);
     expect(res.body[0].season[0]).equal("Summer");
     expect(res.body[0].country[0]).equal("China");
     activityTest.id = res.body[0].id
    });      
});

  it("Deletes test activity", async () => {
  await agent.delete("/activities/"+activityTest.id)
  .expect((response)=> {
  expect(response.status).equal(200);
  });      
});  



  





});