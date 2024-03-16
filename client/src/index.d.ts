declare type ReduxAction = {
    type: string;
  } & Record<string, any>;
  

declare type ActionFn<Payload = any, Arguments = any[]> = (
    ...args: Arguments
  ) => ReduxAction;

declare type ApiActionFn<Arguments = any[]> = (...args: Arguments) => APIAction;

declare type ReduxApiAction = {
    type: 'CALL_API';
    actions?: {
      success: string;
      error: string;
    };
    shouldCache?: boolean;
  };
  
  declare type APIAction = {
    shouldCache?: boolean;
  } & ReduxApiAction &
    import('axios').AxiosRequestConfig;
  
  declare type channelReducer = (
    eventType: string,
    value: Record<string, unknown>,
  ) => void;
  
  declare type CallApiProps = {
    shouldCache?: boolean;
  } & import('axios').AxiosRequestConfig;
  
  declare type CallApi<T = any> = (data: CallApiProps) => Promise<{
    payload: import('axios').AxiosResponse<T>['data'];
    response: Omit<import('axios').AxiosResponse<T>, 'data'>;
  }>;


declare type FileStore = {
    project: Record<string, string>
}


declare type ReduxStore = {
    files: FileStore
}