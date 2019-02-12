import {AbstractResponse, AbstractRoute, JsonResponse} from "kudy";
import {Request, Response} from "express";
import * as chai from 'chai';
import {mockRes} from "sinon-express-mock";
import RouteTester from "./RouteTester";

const expect = chai.expect;

const TEST_ROUTE_HANDLER_RESPONSE = {
    status: 'OK'
}

class TestRoute extends AbstractRoute {
    handler(req: Request, res: Response): Promise<AbstractResponse> | AbstractResponse {
        return new JsonResponse(TEST_ROUTE_HANDLER_RESPONSE)
    }

    get method(): string {
        return "GET";
    }

    get path(): string {
        return "/0/test";
    }
}

describe('RouterTester', function () {
    it('should correctly test route without request options', function () {
        const tester = new RouteTester();
        const route = new TestRoute();

        tester.test(route, {}, async (res: mockRes.MockRes): Promise<void> => {
            expect(res.json).to.be.calledWith(TEST_ROUTE_HANDLER_RESPONSE);
        })
    })
})