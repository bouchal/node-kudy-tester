import {AbstractRoute} from "kudy";
import {RequestOptions} from "http";
import {mockRes, mockReq} from "sinon-express-mock";


type ResponseTestFn = (res: mockRes.MockRes) => Promise<void>;
type TesterFn = () => Promise<void>

export default class RouteTester {
    public test(route: AbstractRoute, requestOptions: RequestOptions, responseTestFn: ResponseTestFn): TesterFn {
        return async function () {
            const req = mockReq({
                method: route.method,
                url: route.fullPath,
                ...requestOptions
            });

            const res = mockRes();

            const response = await route.handler(req, res);
            await response.sendToResponse(res);
            await responseTestFn(res);
        };
    }
}