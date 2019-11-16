import React from 'react';
import Panel from './Panel';
import { sidebarStyle, inputStyle, miniInputStyle } from './style';
import { Size } from '../types';

export default ({
  onChangeTemplate,
  onDownload,
  name,
  image,
  size,
  fontName,
}: {
  onChangeTemplate: any;
  onDownload: any;
  name: string;
  image: string | null;
  size: Size;
  fontName: string;
}) => (
  <div style={sidebarStyle({ left: 0 })}>
    <Panel head="Template Name">
      <input
        style={inputStyle()}
        value={name}
        onChange={e => onChangeTemplate(e.target.value, 'name')}
      />
    </Panel>
    <Panel head="Size">
      <div>
        <label>H:</label>
        <input
          type="number"
          style={miniInputStyle()}
          value={size.height}
          onChange={e => {
            onChangeTemplate({ ...size, height: +e.target.value }, 'size');
          }}
        />
      </div>
      <div>
        <label>W:</label>
        <input
          type="number"
          style={miniInputStyle()}
          value={size.width}
          onChange={e => {
            onChangeTemplate({ ...size, width: +e.target.value }, 'size');
          }}
        />
      </div>
    </Panel>
    <Panel head="Font">
      <select>
        <option>Serif</option>
        <option>Sans-serif</option>
      </select>
    </Panel>
    <Panel head="Action">
      <button
        onClick={onDownload}
        style={{ display: 'block', marginBottom: 10 }}
      >
        Dowload Template
      </button>
      <div style={{ display: 'inline-flex', marginBottom: 10 }}>
        <label>
          Load Background Image
          <input
            style={{ width: '90%' }}
            type="file"
            accept="image/*"
            onChange={event => {
              const files = event.target.files;
              const fileReader = new FileReader();
              fileReader.addEventListener('load', e => {
                if (e.target) {
                  onChangeTemplate(e.target.result, 'image');
                }
              });
              if (files && files[0]) {
                fileReader.readAsDataURL(files[0]);
              }
            }}
            onClick={e => {
              e.currentTarget.value = '';
            }}
          />
        </label>
        <button onClick={() => onChangeTemplate('', 'image')}>X</button>
      </div>
      <div style={{ display: 'inline-flex', marginBottom: 10 }}>
        <label>
          Import Template
          <input
            style={{ width: '90%' }}
            type="file"
            accept="application/json"
            // tslint:disable-next-line: jsx-no-lambda
            onChange={event => {
              const files = event.target.files;
              const fileReader = new FileReader();
              fileReader.addEventListener('load', e => {
                if (e.target) {
                  // @ts-ignore
                  onChangeTemplate(JSON.parse(e.target.result), 'template');
                }
              });
              if (files && files[0]) {
                fileReader.readAsText(files[0]);
              }
            }}
            onClick={e => {
              e.currentTarget.value = '';
            }}
          />
        </label>
      </div>
    </Panel>
  </div>
);
