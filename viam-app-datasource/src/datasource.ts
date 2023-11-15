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
import { ViamClient } from '@viamrobotics/sdk';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  viamClient: ViamClient | undefined;
  apiKeyID: string;
  apiKey: string;
  orgID: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.apiKeyID = instanceSettings.jsonData.apiKeyID || '';
    this.apiKey = instanceSettings.jsonData.apiKey || '';
    this.orgID = instanceSettings.jsonData.orgID || '';
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
    const client = new ViamClient(dialOpts, );
    await client.connect();
    return client;
  }

  async runQuery(query: MyQuery) {
    if (!this.viamClient) {
      this.viamClient = await this.connect(this.apiKeyID, this.apiKey)
    }

    try {
      const dataList = await this.viamClient.dataClient?.tabularDataByMQL(this.orgID, query.mql);
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
