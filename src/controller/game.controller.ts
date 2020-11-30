import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { GameInfo } from "../entities/GameInfo";
import { Wishlist } from "../entities/Wishlist";
import { ErrorObject } from "../helper/errorHandler";

export const getGameBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug;
    // const gameInfo = await getRepository(GameInfo).findOne({
    //   where: { slug: slug },
    //   relations: ["gameOffers", "gameOffers.store", "fullGame"],
    // });

    const gameInfo = await getRepository(GameInfo)
      .createQueryBuilder("gameInfo")
      .where("gameInfo.slug = :slug AND gameInfo.isActive = :isTrue", {
        slug: slug,
        isTrue: true,
      })
      .leftJoinAndSelect("gameInfo.gameOffers", "gameOffer")
      .orderBy("gameOffer.price")
      .leftJoinAndSelect("gameOffer.store", "store")
      .leftJoinAndSelect("gameInfo.fullGame", "fullGame")
      .getOne();

    if (!gameInfo) {
      const error: ErrorObject = new Error("Game not found.");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ gameInfo });
  } catch (err) {
    next(err);
  }
};
