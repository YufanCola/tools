import React, { useState } from 'react';

const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (err) {
      setOutput('编码失败');
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (err) {
      setOutput('解码失败');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="tool-card animate-slide-up">
      <div className="flex justify-end mb-6">
        <button onClick={clearAll} className="tool-button-secondary text-sm">
          <i className="fas fa-trash mr-1"></i>清空
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              mode === 'encode'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <i className="fas fa-lock mr-2"></i>编码
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              mode === 'decode'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <i className="fas fa-unlock mr-2"></i>解码
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? '原始 URL' : '编码后的 URL'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的 URL...' : '输入要解码的 URL...'}
            className="tool-textarea h-24 scrollbar-thin"
          />
        </div>

        <button onClick={handleProcess} className="tool-button w-full">
          <i className={`fas ${mode === 'encode' ? 'fa-lock' : 'fa-unlock'} mr-2`}></i>
          {mode === 'encode' ? '编码' : '解码'}
        </button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'encode' ? '编码结果' : '解码结果'}
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
              className="tool-textarea h-24 scrollbar-thin bg-gray-50 dark:bg-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlEncoder;
