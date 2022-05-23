import { Web3ApiClient } from "@web3api/client-js";
import { concurrentPromisePlugin } from "../";

jest.setTimeout(30000);

describe("e2e", () => {
  let client: Web3ApiClient;
  const uri = "ens/sampleplugin.eth";

  beforeAll(() => {
    // Add the samplePlugin to the Web3ApiClient
    client = new Web3ApiClient({
      plugins: [
        {
          uri: uri,
          plugin: concurrentPromisePlugin({
            query: {},
            mutation: {},
          }),
        },
      ],
    });
  });

  test("async", async () => {
    const result = await client.invoke({
      uri: uri,
      module: "mutation",
      method: "schedule",
      input: {},
    });
    console.log(result.data);

    const result2 = await client.invoke({
      uri: uri,
      module: "query",
      method: "result",
      input: {
        taskIds: result.data,
      },
    });

    console.log(result2.data);
  });

  // it("schedule", async () => {
  //   let result = await client.query({
  //     uri: uri,
  //     query: `
  //       mutation {
  //         schedule(tasks: $tasks)
  //       }
  //     `,
  //     variables: {
  //       tasks: [
  //         {
  //           uri: "w3://ipfs/QmT6QsSVsEGPUDbwvjSRSz3jvkxFJAe15tensof49gxGUo",
  //           module: "query",
  //           method: "ping",
  //           input: undefined
  //         },
  //         {
  //           uri: "w3://coingecko.defiwrapper.eth",
  //           module: "query",
  //           method: "ping",
  //           input: undefined
  //         },
  //         {
  //           uri: "w3://ens/rinkeby/coingecko.defiwrapper.eth",
  //           module: "query",
  //           method: "ping",
  //           input: undefined
  //         },
  //       ],
  //     },
  //   })
  // result = await client.invoke({
  //   uri,
  //   module: "mutation",
  //   method: "schedule",
  //   input: {
  //     tasks: [
  //       {
  //         uri: "w3://ipfs/QmT6QsSVsEGPUDbwvjSRSz3jvkxFJAe15tensof49gxGUo",
  //         module: "query",
  //         method: "ping",
  //         input: undefined
  //       },
  //       {
  //         uri: "w3://coingecko.defiwrapper.eth",
  //         module: "query",
  //         method: "ping",
  //         input: undefined
  //       },
  //       {
  //         uri: "w3://ens/rinkeby/coingecko.defiwrapper.eth",
  //         module: "query",
  //         method: "ping",
  //         input: undefined
  //       }
  //     ]
  //   }
  // });

  //   console.log(result);

  //   // result = await client.invoke({
  //   //   uri,
  //   //   module: "query",
  //   //   method: "result",
  //   //   input: {
  //   //     taskIds: result.data,
  //   //     returnWhen: "ALL_COMPLETED"
  //   //   }
  //   // });

  //   result = await client.query({
  //     uri,
  //     query: `
  //       query {
  //         result(taskIds: $taskIds, returnWhen: $returnWhen)
  //       }
  //     `,
  //     variables: {
  //       taskIds: result.data,
  //       returnWhen: "ALL_COMPLETED"
  //     }
  //   });

  //   console.log(result);
  // });
});
