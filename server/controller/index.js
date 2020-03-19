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
      let room = await Room.create(req.body);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }
  static async showUser(req, res, next) {
    try {
      let condition = {
        include: Room
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
        RoomId: req.body.id
      };
      let joined = await User.update(input, condition);
      res.status(200).json(joined);
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
}

module.exports = Controller;
