import React, { ChangeEvent } from 'react';
import { InlineFieldRow, TextArea } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { DEFAULT_QUERY, MyDataSourceOptions, MyQuery } from '../types';
import { defaults } from 'lodash';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {

  // @TODO To make better use of the date fields provided in Grafana, we might want to figure out how to pass these as variables into an MQL/SQL query
  /*
  const onStartTimeChange = (datetime: DateTime) => {
    const date = datetime.toDate();
    onChange({ ...query, starttime: date });
    // executes the query
    onRunQuery();
  };

  const onEndTimeChange = (datetime: DateTime) => {
    const date = datetime.toDate();
    onChange({ ...query, endtime: date });
    // executes the query
    onRunQuery();
  };
  */

  const onMQLQueryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...query, mql: event?.target.value });
  };

  query = defaults(query, DEFAULT_QUERY);
  const {
    //starttime,
    //endtime,
    mql,
  } = query;

  return (
    <div>
      <InlineFieldRow>
        <TextArea onChange={onMQLQueryChange} value={mql || ''} invalid={false} placeholder={'Add your MQL query'} cols={10} disabled={false} />
      </InlineFieldRow>
      {/*
      <InlineFieldRow>
        <InlineField label="Start Time" labelWidth={12}>
          <DateTimePicker onChange={onStartTimeChange} date={dateTime(starttime)} />
        </InlineField>
        <InlineField label="End Time" labelWidth={12}>
          <DateTimePicker onChange={onEndTimeChange} date={dateTime(endtime)} />
        </InlineField>
      </InlineFieldRow>
      */}
    </div>
  );
}
