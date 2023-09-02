import { AuthGuard } from "@nestjs/passport";

// Separation of concerns, helps to reuse guards with specific types
export class JwtGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }
}
