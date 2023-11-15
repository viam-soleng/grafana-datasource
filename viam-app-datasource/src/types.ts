import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export interface MyQuery extends DataQuery {
  //queryText?: string;
  //starttime: Date;
  //endtime: Date;
  mql: string,
}

export const DEFAULT_QUERY: Partial<MyQuery> = {
  //starttime: new Date('2023-10-25T09:00:00.000Z'),
  //endtime: new Date('2023-10-25T09:30:00.000Z'),
  mql: "[]"
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  apiKeyID?: string;
  apiKey?: string;
  orgID?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {

}
