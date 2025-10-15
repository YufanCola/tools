import React, { useState, useEffect } from 'react';

const TimestampTool = () => {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timestampToDate = (ts) => {
    try {
      const date = new Date(parseInt(ts));
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return '无效时间戳';
    }
  };

  const dateToTimestamp = (dateStr) => {
    try {
      return new Date(dateStr).getTime().toString();
    } catch {
      return '无效日期';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="tool-card animate-slide-up">

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">当前时间戳</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white">{currentTime}</p>
            </div>
            <button
              onClick={() => copyToClipboard(currentTime.toString())}
              className="tool-button-secondary"
              title="复制"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {timestampToDate(currentTime)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            时间戳转日期
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="输入时间戳（毫秒）"
              className="tool-input flex-1"
            />
            <button
              onClick={() => copyToClipboard(timestampToDate(timestamp))}
              className="tool-button-secondary"
              title="复制结果"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
          {timestamp && (
            <p className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
              {timestampToDate(timestamp)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            日期转时间戳
          </label>
          <div className="flex space-x-2">
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="tool-input flex-1"
            />
            <button
              onClick={() => copyToClipboard(dateToTimestamp(datetime))}
              className="tool-button-secondary"
              title="复制结果"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
          {datetime && (
            <p className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg font-mono">
              {dateToTimestamp(datetime)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimestampTool;
