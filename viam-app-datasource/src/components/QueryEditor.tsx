import React, { ChangeEvent } from 'react';
import { DateTimePicker, InlineField, InlineFieldRow, Input, TagsInput } from '@grafana/ui';
import { DateTime, QueryEditorProps, dateTime } from '@grafana/data';
import { DataSource } from '../datasource';
import { DEFAULT_QUERY, MyDataSourceOptions, MyQuery } from '../types';
import { defaults } from 'lodash';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
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

  const onComponentTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, componentType: event.target.value });
  };
  const onComponentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, componentName: event.target.value });
  };
  const onMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, method: event.target.value });
  };
  const onRobotNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, robotName: event.target.value });
  };
  const onRobotIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, robotId: event.target.value });
  };
  const onPartNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, partName: event.target.value });
  };
  const onPartIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, partId: event.target.value });
  };
  const onLocationIdChange = (locationIDs: string[]) => {
    onChange({ ...query, locationIdsList: locationIDs });
  };
  const onOrgIdChange = (organizationIDs: string[]) => {
    onChange({ ...query, organizationIdsList: organizationIDs });
  };
  const onTagsChange = (tags: string[]) => {
    onChange({ ...query, tags: tags });
  };

  query = defaults(query, DEFAULT_QUERY);
  const {
    starttime,
    endtime,
    componentType,
    componentName,
    method,
    robotName,
    robotId,
    partName,
    partId,
    locationIdsList,
    organizationIdsList,
    tags,
  } = query;

  return (
    <div>
      <InlineFieldRow>
        <InlineField label="Org. IDs" labelWidth={10}>
            <TagsInput tags={organizationIdsList} onChange={onOrgIdChange} placeholder="Enter a list of org. id's" />
          </InlineField>
          <InlineField label="Loc. IDs" labelWidth={10}>
            <TagsInput tags={locationIdsList} onChange={onLocationIdChange} placeholder="Enter a list of loc. id's" />
          </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Start Time" labelWidth={12}>
          <DateTimePicker onChange={onStartTimeChange} date={dateTime(starttime)} />
        </InlineField>
        <InlineField label="End Time" labelWidth={12}>
          <DateTimePicker onChange={onEndTimeChange} date={dateTime(endtime)} />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Robot Name" labelWidth={16}>
          <Input onChange={onRobotNameChange} value={robotName || ''} />
        </InlineField>
        <InlineField label="Robot ID" labelWidth={16}>
          <Input onChange={onRobotIdChange} value={robotId || ''} />
        </InlineField>
        </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Component Type" labelWidth={16}>
          <Input onChange={onComponentTypeChange} value={componentType || ''} />
        </InlineField>
        <InlineField label="Component Name" labelWidth={16}>
          <Input onChange={onComponentNameChange} value={componentName || ''} />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Part Name" labelWidth={16}>
          <Input onChange={onPartNameChange} value={partName || ''} />
        </InlineField>
        <InlineField label="Part ID" labelWidth={16}>
          <Input onChange={onPartIdChange} value={partId || ''} />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Method" labelWidth={16}>
            <Input onChange={onMethodChange} value={method || ''} />
          </InlineField>
          <InlineField label="Tags" labelWidth={10}>
          <TagsInput tags={tags} onChange={onTagsChange} placeholder="Enter a list of tags" />
          </InlineField>
      </InlineFieldRow>
    </div>
  );
}
