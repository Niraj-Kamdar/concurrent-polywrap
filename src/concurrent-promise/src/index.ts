export * from "./w3";

// import { mutation, query } from "./resolvers";
// import {  Interface_Task, Interface_TaskResult, Interface_TaskStatusEnum, manifest } from "./w3";

// import {
//   Plugin,
//   PluginFactory,
//   PluginPackageManifest,
//   PluginModules,
//   Client,
//   InvokeApiResult,
//   InvokableModules,
// } from "@web3api/core-js";
// import { Input_cancel, Input_schedule } from "./w3/mutation";
// import { Input_result } from "./w3/query";

// export interface ConcurrentPromiseConfig {}

// export class ConcurrentPromisePlugin extends Plugin {
//   private _totalTasks: number = 0;
//   private _tasks: Record<string, Promise<InvokeApiResult<unknown>>> = {};
//   constructor(private _config: ConcurrentPromiseConfig) {
//     super();
//   }

//   public config(): ConcurrentPromiseConfig {
//     return this._config;
//   }

//   public static manifest(): PluginPackageManifest {
//     return manifest;
//   }

//   public getModules(): PluginModules {
//     return {
//       query: query(this),
//       mutation: mutation(this),
//     };
//   }

//   public async schedule(
//     input: Input_schedule,
//     client: Client
//   ): Promise<string[]> {
//     const { tasks } = input;
//     const taskIds = tasks.map((task) => {
//       const taskId = this._generateTaskId();
//       this._tasks[taskId] = this._executeTask(task, client);
//       return taskId;
//     });
//     return taskIds;
//   }

//   public async cancel(
//     input: Input_cancel,
//     client: Client
//   ): Promise<boolean[]> {
//     // TODO: Maybe Use AbortController to cancel the task
//     const { taskIds } = input;
//     const results = taskIds.map((taskId: string) => {
//       delete this._tasks[taskId];
//       return true;
//     });
//     return results;
//   }

//   public async result(
//     input: Input_result,
//     client: Client
//   ): Promise<Interface_TaskResult[]> {
//     const { taskIds } = input;
//     // TODO: .all, .race, .any depending on returnWhen
//     if (input.returnWhen === "ALL_COMPLETED") {
//       return await Promise.all(this._mapTasks(taskIds));
//     }
//     return [];
//   }

//   public async status(
//     input: Input_result,
//     client: Client
//   ): Promise<Interface_TaskStatusEnum[]> {
//     const { taskIds } = input;
//     return taskIds.map((taskId: string) => {
//       const task = this._tasks[taskId];
//       if (task === undefined) {
//         return Interface_TaskStatusEnum.CANCELLED;
//       }
//       return Interface_TaskStatusEnum.RUNNING;
//     });
//   }

//   private _mapTasks(taskIds: string[]): Array<Promise<Interface_TaskResult>> {
//     console.log(taskIds);
//     console.log(this._totalTasks);
//     return [];
//     // return taskIds.map(async (taskId: string) => {
//     //   const task = this._tasks[taskId];
//     //   if (!task) {
//     //     return {
//     //       taskId: taskId,
//     //       status: Interface_TaskStatusEnum.CANCELLED,
//     //       result: null,
//     //       error: null,
//     //     };
//     //   }
//     //   const { error, data } = await task;
//     //   return {
//     //     taskId: taskId,
//     //     status: Interface_TaskStatusEnum.COMPLETED,
//     //     result: data ? data as Bytes : null,
//     //     error: error ? error.message : null,
//     //   };
//     // })
//   }

//   private _executeTask(
//     task: Interface_Task,
//     client: Client
//   ): Promise<InvokeApiResult<unknown>> {
//     return client.invoke({
//       uri: task.uri,
//       module: task.module as InvokableModules,
//       method: task.method,
//       input: task.input ? task.input : undefined,
//       noDecode: true,
//     });
//   }

//   private _generateTaskId(): string {
//     this._totalTasks += 1;
//     return this._totalTasks.toString();
//   }
// }

// export const samplePlugin: PluginFactory<ConcurrentPromiseConfig> = (
//   opts: ConcurrentPromiseConfig
// ) => {
//   return {
//     factory: () => new ConcurrentPromisePlugin(opts),
//     manifest: ConcurrentPromisePlugin.manifest(),
//   };
// };

// export const plugin = samplePlugin;
