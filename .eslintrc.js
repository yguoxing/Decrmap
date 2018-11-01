module.exports = {
    "env": {
        "browser": true,
		"node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
		"sourceType": "module",
        "ecmaVersion": 6
    },
    "rules": {
		// 开启4个空格缩进规则
		"indent": [2, 4, { "SwitchCase": 1 }],
		"semi": [2, "always"],
		// 关闭规则，允许使用require
		"global-require": 0,
		//不能有声明后未被使用的变量或参数
		"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],
		// 关闭规则，忽略行结尾符
		"linebreak-style": 0,
		// 允许二进制运算符
		"no-bitwise":0,
		// 允许变量在块作用域外使用，暂时先关掉
		"block-scoped-var":0,
		// 允许直接使用 Object.prototypes 的内置属性
		"no-prototype-builtins":0,
		// 允许使用特定的语法
		"no-restricted-syntax":0,
		// 允许使用一元操作符 ++ 和 --
		"no-plusplus":0,
		// 允许var声明不在代码开始声明
		"vars-on-top":0,
		// 允许标识符中含有下划线
		"no-underscore-dangle": 0,
		// 允许空行前面有空格
		"no-trailing-spaces":[2,{ "skipBlankLines": true }],
		// 允许使用label
		"no-labels": 0,
		// 允许对 function 的参数进行重新赋值
		"no-param-reassign": 0,
		"no-mixed-operators": [
		  2,
		  {
			"groups": [
			  ["&", "|", "^", "~", "<<", ">>", ">>>"],
			  ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
			  ["&&", "||"],
			  ["in", "instanceof"]
			],
			"allowSamePrecedence": true
		  }
		],
		// 强制使用命名的 function 表达式
		"func-names": 0,
		// 关闭 === 替代 ==
		"eqeqeq": 0,
		"valid-jsdoc": 2,
		// 强制一行的最大长度
		"max-len":[2,130],
		//"no-unneeded-ternary": ["error", { "defaultAssignment": true }],
		// 关闭规则, 允许在循环中使用continue跳出循环
		"no-continue": 0,
		// 关闭规则, 允许在else内使用if，保证程序的逻辑性
		"no-lonely-if": 0,
		"quotes": [2, "single"],
		"no-debugger": 2,//禁止使用debugger
		"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
		"no-dupe-args": 2,//函数参数不能重复
		"no-duplicate-case": 2,//switch中的case标签不能重复
		"no-extra-semi": 2,//禁止多余的冒号
		"no-func-assign": 2,//禁止重复的函数声明
		"no-mixed-requires": [0, false],//声明时不能混用声明类型
		"no-multiple-empty-lines": [2, {"max": 1}],//空行最多不能超过2行
		"no-undef": 2,//不能有未定义的变量
		"valid-jsdoc": 0,//jsdoc规则
		"no-console": 0
	}
};