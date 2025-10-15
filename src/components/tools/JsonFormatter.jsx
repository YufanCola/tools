import React, { useState } from 'react';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式: ' + err.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式: ' + err.message);
      setOutput('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

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
            输入 JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="粘贴或输入 JSON 数据..."
            className="tool-textarea h-32 scrollbar-thin"
          />
        </div>

        <div className="flex space-x-2">
          <button onClick={formatJson} className="tool-button flex-1">
            <i className="fas fa-indent mr-2"></i>格式化
          </button>
          <button onClick={minifyJson} className="tool-button flex-1">
            <i className="fas fa-compress mr-2"></i>压缩
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                输出结果
              </label>
              <button
                onClick={() => copyToClipboard(output)}
                className="tool-button-secondary text-sm"
              >
                <i className="fas fa-copy mr-1"></i>复制
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="tool-textarea h-32 scrollbar-thin bg-gray-50 dark:bg-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonFormatter;
