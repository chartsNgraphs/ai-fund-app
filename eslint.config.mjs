import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			"no-console": "off",
		"prettier/prettier":[  //or whatever plugin that is causing the clash
            "error",
            {
                "tabWidth":4
            }
        ]
		},
	},
];

export default eslintConfig;
