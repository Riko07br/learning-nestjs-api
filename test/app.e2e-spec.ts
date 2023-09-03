import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { SignInDto, SignUpDto } from "../src/auth/dto";
import { EditUserDto } from "../src/user/dto";
import { CreateOrderDto, UpdateOrderDto } from "../src/order/dto";

describe("App e2e", () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        //Basically same thing inside main.ts
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        );

        await app.init();
        await app.listen(3333);

        prisma = app.get(PrismaService);

        await prisma.cleanDb();
        pactum.request.setBaseUrl("http://localhost:3333");
    });

    afterAll(() => {
        app.close();
    });

    describe("Auth", () => {
        describe("Signup", () => {
            const signUpDto: SignUpDto = {
                email: "test@testing.com",
                password: "123456789",
                first_name: "Tester",
            };

            it("Should throw if email is empty", () => {
                return pactum
                    .spec()
                    .post("/auth/signup")
                    .withBody({ password: signUpDto.password })
                    .expectStatus(400);
            });

            it("Should signup", () => {
                return pactum
                    .spec()
                    .post("/auth/signup")
                    .withBody(signUpDto)
                    .expectStatus(201);
            });
        });

        describe("Signin", () => {
            const signInDto: SignInDto = {
                email: "test@testing.com",
                password: "123456789",
            };

            it("Should throw if email is empty", () => {
                return pactum
                    .spec()
                    .post("/auth/signin")
                    .withBody({ password: signInDto.password })
                    .expectStatus(400);
            });

            it("Should signin", () => {
                return pactum
                    .spec()
                    .post("/auth/signin")
                    .withBody(signInDto)
                    .expectStatus(200)
                    .stores("access_token", "access_token");
            });
        });
    });

    describe("User", () => {
        describe("Get current user", () => {
            it("Should get current user", () => {
                return pactum
                    .spec()
                    .get("/users")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(200);
            });
        });
        describe("Edit user", () => {
            it("Should edit current user", () => {
                const dto: EditUserDto = {
                    first_name: "Edited name",
                    last_name: "Added last name",
                };

                return pactum
                    .spec()
                    .patch("/users")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .withBody(dto)
                    .expectStatus(200);
            });
        });
    });

    describe("Order", () => {
        describe("Get empty orders", () => {
            it("Should get empty orders", () => {
                return pactum
                    .spec()
                    .get("/orders")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(200)
                    .expectBody([]);
            });
        });

        describe("Create order", () => {
            it("Should create order", () => {
                const dto: CreateOrderDto = {
                    description: "Test order",
                    quantity: 5,
                    price: 5.5,
                };
                return pactum
                    .spec()
                    .post("/orders")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .stores("orderId", "id");
            });
        });

        describe("Get orders", () => {
            it("Should get orders", () => {
                return pactum
                    .spec()
                    .get("/orders")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(200);
            });
        });
        describe("Get order by id", () => {
            it("Should get order by id", () => {
                return pactum
                    .spec()
                    .get("/orders/{id}")
                    .withPathParams("id", "$S{orderId}")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(200)
                    .expectBodyContains("$S{orderId}");
            });
        });
        describe("Edit order by id", () => {
            const updateOrderDto: UpdateOrderDto = {
                description: "New test description",
                quantity: 20,
                price: 10.0,
            };

            it("Should edit order by id", () => {
                return pactum
                    .spec()
                    .patch("/orders/{id}")
                    .withPathParams("id", "$S{orderId}")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .withBody(updateOrderDto)
                    .expectStatus(200)
                    .expectBodyContains("$S{orderId}")
                    .inspect();
            });
        });

        describe("Delete order by id", () => {
            it("Should delete order by id", () => {
                return pactum
                    .spec()
                    .delete("/orders/{id}")
                    .withPathParams("id", "$S{orderId}")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(204);
            });

            it("Should get empty orders", () => {
                return pactum
                    .spec()
                    .get("/orders")
                    .withHeaders({
                        Authorization: "Bearer $S{access_token}",
                    })
                    .expectStatus(200)
                    .expectBody([]);
            });
        });
    });
});
