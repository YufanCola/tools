import React, { useState } from 'react';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});

  // 简单的哈希函数实现
  const simpleHash = (str, algorithm) => {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // 根据算法类型调整输出格式
    switch (algorithm) {
      case 'md5':
        return Math.abs(hash).toString(16).padStart(32, '0').substring(0, 32);
      case 'sha1':
        return Math.abs(hash).toString(16).padStart(40, '0').substring(0, 40);
      case 'sha256':
        return Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
      default:
        return Math.abs(hash).toString(16);
    }
  };

  const generateHashes = () => {
    if (!input.trim()) {
      setHashes({});
      return;
    }

    const newHashes = {
      md5: simpleHash(input, 'md5'),
      sha1: simpleHash(input, 'sha1'),
      sha256: simpleHash(input, 'sha256'),
    };
    setHashes(newHashes);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInput('');
    setHashes({});
  };

  React.useEffect(() => {
    generateHashes();
  }, [input]);

  return (
    <div className="tool-card animate-slide-up">
      <div className="flex justify-end mb-6">
        <button onClick={clearAll} className="tool-button-secondary text-sm">
          <i className="fas fa-trash mr-1"></i>清空
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要生成哈希的文本..."
            className="tool-textarea h-24 scrollbar-thin"
          />
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">哈希结果</h3>
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div
                key={algorithm}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {algorithm}
                    </span>
                  </div>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                    {hash}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(hash)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded ml-2"
                  title="复制"
                >
                  <i className="fas fa-copy text-gray-600 dark:text-gray-400"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
            <i className="fas fa-exclamation-triangle mr-2"></i>注意
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            这是一个简化的哈希生成器，仅用于演示目的。在生产环境中，请使用专业的加密库来生成真正的哈希值。
          </p>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;
