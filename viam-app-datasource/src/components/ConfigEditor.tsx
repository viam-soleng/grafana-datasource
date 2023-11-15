import React, { ChangeEvent } from 'react';
import { InlineField, Input, SecretInput } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions, MySecureJsonData> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;

  const onKeyIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      apiKeyID: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      apiKey: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onOrgIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      orgID: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onResetAPIKey = () => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      jsonData: {
        ...options.jsonData,
        apiKey: '',
        orgID: ''
      },
    });
  };

  const { jsonData, secureJsonFields } = options;

  return (
    <div className="gf-form-group">
      <InlineField label="API Key ID" labelWidth={12}>
        <Input
          onChange={onKeyIDChange}
          value={jsonData.apiKeyID || ''}
          placeholder="Add Key ID"
          width={40}
        />
      </InlineField>
      <InlineField label="API Key" labelWidth={12}>
        <SecretInput
          isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
          value={jsonData.apiKey || ''}
          placeholder="Add Secret"
          width={40}
          onReset={onResetAPIKey}
          onChange={onKeyChange}
        />
      </InlineField>
      <InlineField label="Org. ID" labelWidth={12}>
        <Input
          onChange={onOrgIDChange}
          value={jsonData.orgID || ''}
          placeholder="Add Org. ID"
          width={40}
        />
      </InlineField>
    </div>
  );
}
