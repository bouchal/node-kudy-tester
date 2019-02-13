# kudy-tester

For more convenient testing of __kudy__ routes requests.

__For example:__

```typescript
import { default as RouteTester } from "kudy-tester";
import {mockRes} from "sinon-express-mock";
import * as chai from 'chai';
import {mockRes} from "sinon-express-mock";

const expect = chai.expect;

import GetPostsRoute from "./router/GetPostsRoute";

const tester = new RouteTester();

it(
    'should call correct status code',
    tester.test(
        new GetPostsRoute(),
        {
            headers: {
                "Authorization": "Bearer XYZ"
            }
        },
        async (res: mockRes.MockRes): Promise<void> => {
            expect(res.sendStatus).to.be.calledWith(200);
        }
    )
);
```

### Parameters:

- __route__
  - Instance of tested route.
- __request additional data__
  - In default request has set only 2 options `method` (from route getter `method`)
  and `url` (from route getter `fullPath`). You can through this parameter pass other
  (like headers, authentication etc.)
- __test function__
  - this function should be async or return promise. It will get final response object as first parameter and you can
  do here all necessary testing stuff. 