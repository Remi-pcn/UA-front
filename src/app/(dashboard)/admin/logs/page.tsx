'use client';
import styles from './style.module.scss';

import React, { useEffect, useState } from 'react';
import { fetchLogs } from '@/modules/logs';
import Table from '@/components/UI/Table';
import { Log } from '@/types';

const tableColumns = [
  { key: 'userId', title: 'UserId' },
  { key: 'route', title: 'Route' },
];

const stringifyObject = (object: unknown, depth: number = 0): JSX.Element => {
  const tabulation = <>&nbsp;&nbsp;</>;
  const lineStart = Array.from(Array(depth).keys()).map(() => tabulation);
  if (object instanceof Array) {
    let result: JSX.Element = <>[</>;
    for (const value of object) {
      result = (
        <>
          {result}
          <br />
          {lineStart}
          {tabulation}
          {stringifyObject(value, depth + 1)},
        </>
      );
    }
    result = (
      <>
        {result}
        <br />
        {lineStart}]
      </>
    );
    return result;
  }
  if (typeof object === 'object') {
    let result: JSX.Element = <>{'{'}</>;
    for (const key in object) {
      result = (
        <>
          {result}
          <br />
          {lineStart}
          {tabulation}
          {key}: {stringifyObject(object[key], depth + 1)},
        </>
      );
    }
    result = (
      <>
        {result}
        <br />
        {lineStart}
        {'}'}
      </>
    );
    return result;
  }
  return <>{object.toString()}</>;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  const refreshLogs = async () => {
    const res = await fetchLogs();
    setLogs(res.logs);
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  const rows = logs.map((log) => ({
    userId: log.userId,
    route: `${log.method} ${log.path}`,
  }));

  return (
    <div id="logs-page" className={styles.log}>
      <Table columns={tableColumns} dataSource={rows} onRowClicked={setSelectedLog} className={styles.table} />
      <div className={styles.bodyWrapper}>
      <div className={styles.body}>{selectedLog ? stringifyObject(logs[selectedLog].body) : false}</div>
      </div></div>
  );
}
