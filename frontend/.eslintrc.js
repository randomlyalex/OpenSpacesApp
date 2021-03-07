// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'no-restricted-imports': [
            'warn',
            {
                patterns: [
                    '@material-ui/*/*/*',
                    '!@material-ui/core/test-utils/*',
                ],
            },
        ],
        'no-unused-vars': [
            'warn',
            {
                varsIgnorePattern: 'React',
            },
        ],
    },
}
