import { endpoints } from "./../endpoints/index";
import { rest } from "msw";

interface LoginBody {
  username: string;
  password: string;
}
interface LoginResponse {
  success: string;
  token: string;
}
interface IBalanceResponse {
  status: string;
  balance: string;
}

interface IPayees {
  status: string;
  data: any[];
}

interface ITransfer {
  status: string;
  data: string[];
}

interface ITransaction {
  status: string;
  data: string[];
}

const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;

export const handlers = [
  rest.post<LoginBody, LoginResponse>(
    `${baseurl}${endpoints.login}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          token: "fake-token"
        })
      );
    }
  ),
  rest.get<{}, IBalanceResponse>(
    `${baseurl}${endpoints.balances}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          balance: 25000
        })
      );
    }
  ),
  rest.get<{}, IPayees>(
    `${baseurl}${endpoints.payee}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          data: [
            {
              id: "8a6da1a4-6f5f-4b53-9b90-0f8c57661a5d",
              accountNo: "8013-777-3232",
              accountHolderName: "Fake Jason"
            },
            {
              id: "19bbc716-ddc3-48d1-a6f9-bb7b96749826",
              accountNo: "4489-991-0023",
              accountHolderName: "Fake Jane"
            }
          ]
        })
      );
    }
  ),
  rest.post<{}, ITransfer>(
    `${baseurl}${endpoints.transfer}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          data: [
            {
              id: "39222a3e-3890-4091-8807-d92707355f8c",
              type: "receive",
              amount: 18.5,
              currency: "SGD",
              from: {
                accountNo: "1234-000-1234",
                accountHolderName: "Fake Max Yee"
              },
              description: null,
              date: "2021-09-12T02:13:03.054Z"
            }
          ]
        })
      );
    }
  ),
  rest.get<{}, ITransaction>(
    `${baseurl}${endpoints.transactions}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          data: [
            {
              id: "39222a3e-3890-4091-8807-d92707355f8c",
              type: "receive",
              amount: 18.5,
              currency: "SGD",
              from: {
                accountNo: "1234-000-1234",
                accountHolderName: "Fake Max Yee"
              },
              description: null,
              date: "2021-09-12T02:13:03.054Z"
            },
            {
              id: "3c6bee24-072d-4919-aff9-b87d1f4c3895",
              type: "receive",
              amount: 23,
              currency: "SGD",
              from: {
                accountNo: "8182-321-9921",
                accountHolderName: "Fake Daniel"
              },
              description: "lunch",
              date: "2021-09-12T01:00:03.054Z"
            }
          ]
        })
      );
    }
  )
];
