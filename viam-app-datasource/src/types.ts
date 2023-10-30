import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export interface MyQuery extends DataQuery {
  queryText?: string;
  starttime: Date;
  endtime: Date;
  componentType: string,
  componentName: string,
  method: string,
  robotName: string,
  robotId: string,
  partName: string,
  partId: string,
  locationIdsList: string[],
  organizationIdsList: string[],
  tags: string[],
  datasetId: string,
}

export const DEFAULT_QUERY: Partial<MyQuery> = {
  starttime: new Date('2023-10-25T09:00:00.000Z'),
  endtime: new Date('2023-10-25T09:30:00.000Z'),
  componentType: '',
  componentName: '',
  method: '',
  robotName: '',
  robotId: '',
  partName: '',
  partId: '',
  locationIdsList: [],
  organizationIdsList: [],
  tags: [],
  datasetId: '',
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  apiKeyID?: string;
  apiKey?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {

}
