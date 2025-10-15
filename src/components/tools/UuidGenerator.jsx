import React, { useState } from 'react';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuids = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUuid());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllUuids = () => {
    const allUuids = uuids.join('\n');
    copyToClipboard(allUuids);
  };

  const clearAll = () => {
    setUuids([]);
  };

  return (
    <div className="tool-card animate-slide-up">
      <div className="flex justify-end mb-6">
        {uuids.length > 0 && (
          <button onClick={clearAll} className="tool-button-secondary text-sm">
            <i className="fas fa-trash mr-1"></i>清空
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              生成数量
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="tool-input"
            />
          </div>
          <div className="flex items-end">
            <button onClick={generateUuids} className="tool-button">
              <i className="fas fa-magic mr-2"></i>生成
            </button>
          </div>
        </div>

        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                生成的 UUID ({uuids.length} 个)
              </label>
              <button
                onClick={copyAllUuids}
                className="tool-button-secondary text-sm"
              >
                <i className="fas fa-copy mr-1"></i>复制全部
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100 flex-1">
                    {uuid}
                  </code>
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded"
                    title="复制"
                  >
                    <i className="fas fa-copy text-gray-600 dark:text-gray-400"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            <i className="fas fa-info-circle mr-2"></i>关于 UUID
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            UUID (Universally Unique Identifier) 是一个128位的标识符，用于在分布式系统中唯一标识信息。
            这里生成的是 UUID v4，基于随机数生成，具有极低的重复概率。
          </p>
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
