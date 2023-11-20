export default {
    setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
        "^@app/(.*)$": "<rootDir>/$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@client/(.*)$": "<rootDir>/src/clientfolder/$1",
        "^@modules/(.*)$": "<rootDir>/src/modules/$1",
        "^@features/(.*)$": "<rootDir>/src/modules/features/$1",
        "^@rsc/(.*)$": "<rootDir>/src/resource/$1",
        "^@moduleRoot/(.*)$": "<rootDir>/src/modules/root/$1",
        "^@supaFuncs/(.*)$": "<rootDir>/supabase/functions/$1",
        "^@netlFuncs/(.*)$": "<rootDir>/netlify/functions/$1",
    },
};
