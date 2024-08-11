require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../app'); 
const Note = require('../modules/notes/notes.model');

describe('Note API', () => {
  // Connect to the database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Close the database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test: Create a new note
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({
        title: 'Test Note',
        body: 'This is a test note.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('title', 'Test Note');
    expect(res.body.data).toHaveProperty('body', 'This is a test note.');
  });

  // Test: Fetch a note by ID
  it('should fetch a note by ID', async () => {
    const note = new Note({
      title: 'Another Test Note',
      body: 'This is another test note.'
    });
    await note.save();

    const res = await request(app)
      .get(`/api/notes/${note._id}`)
      .expect(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('title', 'Another Test Note');
    expect(res.body.data).toHaveProperty('body', 'This is another test note.');
  });

  // Test: Query notes by title substring
  it('should query notes by title substring', async () => {
    await new Note({
      title: 'Test Note 1',
      body: 'This is a test note.'
    }).save();
    await new Note({
      title: 'Test Note 2',
      body: 'Another test note.'
    }).save();
  
    const res = await request(app)
      .get('/api/notes')
      .query({ title: 'Test' })
      .expect(200);
  
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('msg', 'Retrieve Data Successfully!');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  

  // Test: Update a note
  it('should update a note', async () => {
    const note = new Note({
      title: 'Note to Update',
      body: 'This note will be updated.'
    });
    await note.save();

    const res = await request(app)
      .put(`/api/notes/${note._id}`)
      .send({
        title: 'Updated Note',
        body: 'The note has been updated.'
      })
      .expect(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('title', 'Updated Note');
    expect(res.body.data).toHaveProperty('body', 'The note has been updated.');
  });
});
