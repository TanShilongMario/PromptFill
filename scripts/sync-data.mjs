import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const dataPath = resolve('src/data/data.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

const replaceConst = (source, constName, value) => {
  const pattern = new RegExp(`export const ${constName}\\s*=\\s*[\\s\\S]*?;\\s*\\n?`);
  const replacement = `export const ${constName} = ${JSON.stringify(value, null, 2)};\n`;
  const next = source.replace(pattern, replacement);
  if (next === source) {
    throw new Error(`export const ${constName} not found in file.`);
  }
  return next;
};

const tasks = [
  {
    file: resolve('src/data/banks.js'),
    updates: [
      { constName: 'INITIAL_CATEGORIES', value: data.categories },
      { constName: 'INITIAL_BANKS', value: data.banks }
    ]
  },
  {
    file: resolve('src/data/templates.js'),
    updates: [{ constName: 'INITIAL_TEMPLATES_CONFIG', value: data.templates }]
  }
];

tasks.forEach(({ file, updates }) => {
  let content = readFileSync(file, 'utf8');
  updates.forEach(({ constName, value }) => {
    content = replaceConst(content, constName, value);
  });
  writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
