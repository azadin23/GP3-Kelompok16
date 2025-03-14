const ArtisModel = require("../models/artis.model");

class ArtisController {
  static async createNewArtis(req, res) {
    // todo: get `name` from req body
    // create a new artis object
    // save to db
    try {
      const body = req.body;

      const name = body.name;
      const genre = body.genre;
      const songs = body.songs;

      const artis = new ArtisModel({
        name: name,
        genre: genre,
        songs: songs,
      });

      const saved = await artis.save();
      res.status(201).send(saved);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllArtis(req, res) {
    try {
      const artisList = await ArtisModel.find();
      res.status(200).send(artisList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getArtisByID(req, res) {
    try {
      const id = req.params.id;

      const artisList = await ArtisModel.findOne({
        _id: id,
      });
      res.status(200).send(artisList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateArtis(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const genre = body.genre;

      const artisList = await ArtisModel.updateOne(
        { _id: id },
        { genre: genre }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteArtis(req, res) {
    try {
      const id = req.params.id;
      await ArtisModel.deleteOne({ _id: id });
      res
        .status(200)
        .send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = ArtisController;
