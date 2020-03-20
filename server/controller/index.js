const { User, Room } = require("../models");
const createError = require("http-errors");

class Controller {
  static async user(req, res, next) {
    try {
      let createdUser = await User.create(req.body);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
  static async room(req, res, next) {
    try {
      const { name } = req.body;
      let room = await Room.create({ name, status: "Waiting", score: 0 });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }
  static async showUser(req, res, next) {
    try {
      const RoomId = req.params.id;
      let condition = {
        where: { RoomId }
      };
      let listUser = await User.findAll(condition);
      res.status(200).json(listUser);
    } catch (error) {
      next(error);
    }
  }
  static async showRoom(req, res, next) {
    try {
      let condition = {
        include: User
      };
      let listRoom = await Room.findAll(condition);
      res.status(200).json(listRoom);
    } catch (error) {
      next(error);
    }
  }
  static async join(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let input = {
        username: req.body.username,
        score: 0,
        RoomId: req.body.RoomId
      };
      let joined = await User.update(input, condition);
      if (joined[0]) {
        res.status(200).json(joined);
      } else {
        throw createError(404, "Data not found.");
      }
    } catch (error) {
      next(error);
    }
  }
  static async remove(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let removed = await Room.destroy(condition);
      res.status(200).json(removed);
    } catch (error) {
      next(error);
    }
  }
  static async score(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let input = {
        score: req.body.score
      };
      let updated = await User.update(input, condition);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }
  static async status(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let input = {
        status: "Playing"
      };
      let data = await Room.update(input, condition);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
