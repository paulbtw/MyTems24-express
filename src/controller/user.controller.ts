import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { getConnection, getRepository } from "typeorm";
import { Alert } from "../entities/Alert";
import { GameInfo } from "../entities/GameInfo";
import { Wishlist } from "../entities/Wishlist";
import { ErrorObject } from "../helper/errorHandler";

export const getWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const wishlist = await getRepository(Wishlist)
      .createQueryBuilder("wishlist")
      .where("wishlist.userId = :id", { id: userId })
      .addSelect([
        "wishlist.id",
        "wishlist.gameInfoId",
        "wishlist.userId",
        "wishlist.createdAt",
      ])
      .leftJoin("wishlist.gameInfo", "gameInfo")
      .addSelect(["gameInfo.id", "gameInfo.slug"])
      .getMany();
    return res.status(200).json({ wishlist, success: true });
  } catch (err) {
    next(err);
  }
};

export const putWishlistItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = req.params.id;

    if (
      !gameId ||
      !gameId.match(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
      )
    ) {
      const error: ErrorObject = new Error("GameId is required.");
      error.statusCode = 401;
      throw error;
    }

    const gameInfo = await getRepository(GameInfo).findOne(gameId);

    if (!gameInfo) {
      const error: ErrorObject = new Error("Game does not exist.");
      error.statusCode = 401;
      throw error;
    }

    const newWishlist = new Wishlist();
    newWishlist.gameInfoId = gameInfo.id;
    // @ts-ignore
    newWishlist.userId = req.user.id;
    const savedWishlist = await getRepository(Wishlist).save(newWishlist);

    return res.status(201).json({ success: true, savedWishlist });
  } catch (err) {
    next(err);
  }
};

export const deleteWishlistItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = req.params.id;
    // @ts-ignore
    const userId = req.user.id;

    const deletedObject = await getRepository(Wishlist)
      .createQueryBuilder()
      .delete()
      .where("userId = :userId AND gameInfoId = :gameId", {
        userId: userId,
        gameId: gameId,
      })
      .execute();

    // Maybe check if deleted?
    // deletedObject.affected should be 1, but doesn't really matter

    return res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const wishlist = await getRepository(Alert)
      .createQueryBuilder("alert")
      .where("alert.userId = :id", { id: userId })
      .addSelect([
        "alert.id",
        "alert.gameInfoId",
        "alert.userId",
        "alert.createdAt",
        "alert.price",
      ])
      .leftJoin("alert.gameInfo", "gameInfo")
      .addSelect(["gameInfo.id", "gameInfo.slug"])
      .getMany();
    return res.status(200).json({ wishlist, success: true });
  } catch (err) {
    next(err);
  }
};

export const putAlertItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = req.params.id;
    const alertPrice = req.body.price;

    if (
      !gameId ||
      !gameId.match(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
      )
    ) {
      const error: ErrorObject = new Error("GameId is required.");
      error.statusCode = 401;
      throw error;
    }

    const gameInfo = await getRepository(GameInfo).findOne(gameId);

    if (!gameInfo) {
      const error: ErrorObject = new Error("Game does not exist.");
      error.statusCode = 401;
      throw error;
    }

    const newAlert = new Alert();
    newAlert.gameInfoId = gameInfo.id;
    newAlert.price = alertPrice;
    // @ts-ignore
    newAlert.userId = req.user.id;
    const savedAlert = await getRepository(Alert).save(newAlert);

    return res.status(201).json({ success: true, savedAlert });
  } catch (err) {
    next(err);
  }
};

export const deleteAlertItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = req.params.id;
    // @ts-ignore
    const userId = req.user.id;

    const deletedObject = await getRepository(Alert)
      .createQueryBuilder()
      .delete()
      .where("userId = :userId AND gameInfoId = :gameId", {
        userId: userId,
        gameId: gameId,
      })
      .execute();

    // Maybe check if deleted?
    // deletedObject.affected should be 1, but doesn't really matter

    return res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};
