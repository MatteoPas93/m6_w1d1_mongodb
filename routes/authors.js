const express = require("express");
const router = express.Router();
const authorModel = require("../models/authors");

router.get("/getAuthors", async (_, response) => {
  try {
    const authors = await authorModel.find();
    response.status(200).send(authors);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/getAuthor/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: "The requested author does not exist!",
      });
    }
    response.status(200).send(author);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/createAuthor", async (request, response) => {
  const newAuthor = new authorModel({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    birthday: request.body.birthday,
    avatar: request.body.avatar,
  });

  try {
    const authorToSave = await newAuthor.save();
    response.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.patch("/updateAuthor/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: "The requested author does not exist!",
      });
    }

    const updatedData = request.body;
    const options = { new: true };

    const results = await authorModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    response.status(200).send(results);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/deleteAuthor/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await authorModel.findByIdAndDelete(id);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: 'The requested author does not exist"',
      });
    }

    response.status(200).send(`The author has been removed`);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
