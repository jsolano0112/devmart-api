import { createRequest, createResponse } from "node-mocks-http";
import { UserController } from "../../../../user/application/controller/users.controller";
import { IUpdateUser, IUser } from "../../../../shared/interfaces/users";

jest.mock("../../../../user/infraestructure/user-service-container", () => ({
    UserServiceContainer: {
        createUser: { run: jest.fn() },
        getUserById: { run: jest.fn(async (id) => ({ id, firstName: "Wilson", lastName: "Estrada", email: "wilson@example.com", address: "123 Main St", mobilePhone: "1234567890", city: "City", zipCode: 12345, isActive: true, password: "password", isAdmin: false, failedLoginAttempts: 0 })) },
        updateUser: { run: jest.fn() },
        authenticateUser: {
            run: jest.fn(async (credentials) => ({
                id: 1,
                email: credentials.email,
                firstName: "Wilson",
                lastName: "Estrada",
                isAdmin: false,
                accessToken: "access-token",
                refreshToken: "refresh-token"
            })),
        },
    }
}));

describe("UsersController test", () => {


    describe("POST /users create a user", () => {

        test("should create a user", async () => {
            const mocksUser: IUser = {
                id: 1,
                firstName: "Wilson",
                lastName: "Estrada",
                email: "wilson@example.com",
                address: "123 Main St",
                mobilePhone: "1234567890",
                city: "City",
                zipCode: 12345,
                isActive: true,
                password: "password",
                isAdmin: false,
                failedLoginAttempts: 0
            };

            const req = createRequest({
                method: "POST",
                url: "/users",
                body: mocksUser
            });

            const res = createResponse();

            const userController = new UserController();
            await userController.create(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            console.log(res._getJSONData());
            expect(res._getJSONData()).toBe("User created.");

        });
    });

    describe("GET /users/:id", () => {
        test("should return a user by id", async () => {
            const req = createRequest({
                method: "GET",
                url: "/users/1",
                params: { id: 1 }
            });

            const res = createResponse();

            const userController = new UserController();
            await userController.getById(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                id: 1,
                firstName: "Wilson",
                lastName: "Estrada",
                email: "wilson@example.com",
                address: "123 Main St",
                mobilePhone: "1234567890",
                city: "City",
                zipCode: 12345,
                isActive: true,
                password: "password",
                isAdmin: false,
                failedLoginAttempts: 0
            });
        });
    });

    describe("PUT /users/:id update a user", () => {
        test("should update a user", async () => {
            const mocksUser: IUpdateUser = {
                firstName: "Wilson",
                lastName: "Estrada",
                email: "wilson@example.com",
                address: "123 Main St",
                mobilePhone: "1234567890",
                city: "City",
                zipCode: 12345,
                isActive: true,
                password: "password",
                isAdmin: false,
                failedLoginAttempts: 0
            };

            const req = createRequest({
                method: "PUT",
                url: "/users/1",
                params: { id: 1 },
                body: mocksUser
            });

            const res = createResponse();

            const userController = new UserController();
            await userController.update(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual("User updated.");
        });
    });

    describe("POST /users/auth", () => {
        test("should authenticate a user", async () => {
            const req = createRequest({
                method: "POST",
                url: "/users/auth",
                body: {
                    email: "wilson@example.com",
                    password: "password"
                }
            });

            const res = createResponse();

            const userController = new UserController();
            await userController.auth(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                id: 1,
                email: "wilson@example.com",
                firstName: "Wilson",
                lastName: "Estrada",
                isAdmin: false,
                accessToken: "access-token",
                refreshToken: "refresh-token"
            });
        });
    });

});