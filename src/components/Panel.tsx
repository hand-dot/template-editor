import React from 'react';

export default ({
  head,
  action,
  children,
}: {
  head: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div style={{ border: '1px solid #000', marginBottom: 1, color: '#fff' }}>
    <div
      style={{
        fontSize: 'small',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        background: '#333',
        margin: 0,
        padding: 3,
        borderBottom: '1px solid #000',
      }}
    >
      {head}
      {action && action}
    </div>
    <div style={{ padding: 3, backgroundColor: '#888' }}>{children}</div>
  </div>
);
