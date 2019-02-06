// ES模块语法
// 从源模块导入其原始名称的特定项目
import { something } from './module.js';

// 导入时指定自定义名称
import { something as somethingElse } from './module.js';

// 命名空间导入
import * as module from './module.js'

// 默认导入
import something from './module.js';

// 加载模块代码
import './module.js';

// 导出

// 导出以前声明的值
var something = true;
export { something };

// 导出时重命名
export { something as somethings };

// 声明后立即导出
// 这可以与 `var`, `let`, `const`, `class`, and `function` 配合使用
export var something = true;

// 默认导出
export default something;