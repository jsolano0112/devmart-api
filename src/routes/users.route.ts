import express, { Router, Request, Response } from "express";
import { users, usersFromDatabase } from "../constants/mock/users.constants";
import {
  userStatusCode200,
  userStatusCode400ErrorParameters,
} from "../constants/user-response";
import { statusCode404 } from "../constants/general-response";
import { IUserRequest, IUserResponse } from "../interfaces/users";
import { orders } from "../constants/mock/orders.constants";

const userRouter: Router = express.Router();

/**
 * Gets user by ID
 * @param {id} - User ID
 * @return {Promise<IUserResponse>}
 */
userRouter.get("/:id", (request: Request, response: Response) => {
  const { id } = request.params;
  if (!id) {
    response
      .status(userStatusCode400ErrorParameters.statusCode)
      .json(userStatusCode400ErrorParameters);
  }
  //TODO: get from database
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    response.status(statusCode404.statusCode).json(statusCode404);
  }
  response.json(user);
});

/**
 * Creates user
 */
userRouter.post(
  "/",
  (request: Request<{}, {}, IUserRequest>, response: Response) => {
    const {
      email,
      password,
      firstName,
      lastName,
      city,
      mobilePhone,
      address,
      zipCode,
      isAdmin,
    } = request.body;
    if (!email || !password || !firstName || !lastName) {
      return response
        .status(userStatusCode400ErrorParameters.statusCode)
        .json(userStatusCode400ErrorParameters);
    }

    //TODO: Validate password requirements

    //TODO: format mobile phone

    //TODO: Validate zip code length

    //TODO: Validate email if exists and the domain

    const newUser = {
      email,
      firstName,
      lastName,
      city,
      mobilePhone,
      address,
      zipCode,
      isAdmin,
    };

    //TODO: save en database
    response.status(userStatusCode200.statusCode).json(userStatusCode200);
  }
);

/**
 * Updates user
 */
userRouter.put(
  "/:id",
  (request: Request<{ id: string }, {}, IUserRequest>, response: Response) => {
    const { id } = request.params;
    if (!id) {
      response
        .status(userStatusCode400ErrorParameters.statusCode)
        .json(userStatusCode400ErrorParameters);
    }
    //TODO: get from database
    const user = usersFromDatabase.find((u) => u.id === parseInt(id));
    if (!user) {
      response.status(statusCode404.statusCode).json(statusCode404);
    }
    const {
      email,
      password,
      firstName,
      lastName,
      city,
      mobilePhone,
      address,
      zipCode,
      isAdmin,
      isActive,
    } = request.body;
    if (!email || isActive === undefined) {
      return response
        .status(userStatusCode400ErrorParameters.statusCode)
        .json(userStatusCode400ErrorParameters);
    }

    //TODO: Validate pass
    //TODO: Validate email
    //TODO: Validate phonem
    //TODO: Validate zipcode

    if (email) user.email = email;
    if (password) user.password = password;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (city) user.city = city;
    if (mobilePhone) user.mobilePhone = mobilePhone;
    if (address) user.address = address;
    if (zipCode) user.zipCode = zipCode;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    user.isActive = isActive;

    const userUpdated = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      mobilePhone: user.mobilePhone,
      address: user.address,
      zipCode: user.zipCode,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      password: user.password,
    };

    const { password: _password, ...userToSend } = userUpdated;

    //TODO: update in database
    response.json(userToSend);
  }
);

/**
 * Gets user's orders
 */
userRouter.get(
  "/:userId/orders",
  (request: Request<{ userId: string }>, response: Response) => {
    const { userId } = request.params;
    if (!userId) {
      response
        .status(userStatusCode400ErrorParameters.statusCode)
        .json(userStatusCode400ErrorParameters);
    }
    const user = usersFromDatabase.find((u) => u.id === parseInt(userId));
    if (!user) {
      response.status(statusCode404.statusCode).json(statusCode404);
    }

    //TODO: get from database
    const userOrders = orders.filter((u) => u.userId === parseInt(userId));
    if (userOrders.length === 0) {
      response.status(204).json();
    }
    response.json(userOrders);
  }
);

export default userRouter;
