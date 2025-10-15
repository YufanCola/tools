import React, { useState } from 'react';
import TimestampTool from './tools/TimestampTool';
import JsonFormatter from './tools/JsonFormatter';
import Base64Tool from './tools/Base64Tool';
import UuidGenerator from './tools/UuidGenerator';
import UrlEncoder from './tools/UrlEncoder';
import HashGenerator from './tools/HashGenerator';

const ToolGrid = () => {
  const [activeTab, setActiveTab] = useState('timestamp');

  const tools = [
    {
      id: 'timestamp',
      name: '时间戳转换',
      icon: 'fas fa-clock',
      component: <TimestampTool />
    },
    {
      id: 'json',
      name: 'JSON格式化',
      icon: 'fas fa-code',
      component: <JsonFormatter />
    },
    {
      id: 'base64',
      name: 'Base64编解码',
      icon: 'fas fa-exchange-alt',
      component: <Base64Tool />
    },
    {
      id: 'uuid',
      name: 'UUID生成器',
      icon: 'fas fa-fingerprint',
      component: <UuidGenerator />
    },
    {
      id: 'url',
      name: 'URL编解码',
      icon: 'fas fa-link',
      component: <UrlEncoder />
    },
    {
      id: 'hash',
      name: '哈希生成器',
      icon: 'fas fa-hashtag',
      component: <HashGenerator />
    }
  ];

  const activeTool = tools.find(tool => tool.id === activeTab);

  return (
    <div className="animate-fade-in">
      {/* 标签页导航 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-3 font-medium transition-all duration-200 rounded-lg ${
                activeTab === tool.id
                  ? 'bg-primary-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i className={`${tool.icon} text-lg`}></i>
              <span className="text-xs text-center leading-tight">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 工具内容区域 */}
      <div className="animate-slide-up">
        {activeTool?.component}
      </div>
    </div>
  );
};

export default ToolGrid;
