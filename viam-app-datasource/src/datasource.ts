import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import defaults from 'lodash/defaults';
import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';
import { type DialOptions } from '@viamrobotics/rpc/src/dial';
import { ViamClient, FilterOptions } from '@viamrobotics/sdk';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  viamClient: ViamClient | undefined;
  apiKeyID: string;
  apiKey: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.apiKeyID = instanceSettings.jsonData.apiKeyID || '';
    this.apiKey = instanceSettings.jsonData.apiKey || '';
  }

  async connect(keyID: string, key: string): Promise<ViamClient> {
    const credential = {
      payload: key,
      type: 'api-key',
    };
    const dialOpts: DialOptions = {
      authEntity: keyID,
      credentials: credential,
    };
    const client = new ViamClient(dialOpts);
    await client.connect();
    return client;
  }

  async runQuery(query: MyQuery) {
    if (!this.viamClient) {
      this.viamClient = await this.connect(this.apiKeyID, this.apiKey)
    }
    // A filter is an optional tool to filter out which data comes back.
    const opts: FilterOptions = {
      startTime: query.starttime,
      endTime: query.endtime,
      componentType: query.componentType,
      componentName: query.componentName,
      method: query.method,
      robotName: query.robotName,
      robotId: query.robotId,
      partName: query.partName,
      partId: query.partId,
      locationIdsList: query.locationIdsList,
      organizationIdsList: query.organizationIdsList,
      tags: query.tags,
      datasetId: query.datasetId,
    };
    const filter = this.viamClient.dataClient?.createFilter(opts);
    try {
      const dataList = await this.viamClient.dataClient?.tabularDataByFilter(filter);
      return dataList;
    } finally {
    }
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map(async (query) => {
      query = defaults(query, DEFAULT_QUERY);
      let result = await this.runQuery(query);
      const frame = new MutableDataFrame({
        refId: query.refId,
        fields: [
          {name: 'data', type: FieldType.other, values: result}
        ]
      })
      return frame;
    });
    return Promise.all(promises).then((data) => ({ data }));
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
