module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["airbnb-base", "prettier"],
    // "settings": {
    //     "import/resolver": {
    //         node: { paths: [path.resolve('./src')]}
    //     },
    // },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-var": 1,
        "comma-dangle": 0,
        "no-console": 0,
        "eol-last": 0,
        "func-names": 0
    }
};