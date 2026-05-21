import './index.css';
import * as echarts from 'echarts';
import { initApp, handleRouteChange } from './main';

// Make echarts available globally for main.ts
(window as any).echarts = echarts;

// Initialize the application
initApp();

// Listen for hash changes
window.addEventListener('hashchange', handleRouteChange);
