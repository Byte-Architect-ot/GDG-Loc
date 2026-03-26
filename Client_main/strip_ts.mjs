import fs from 'fs';
import babel from '@babel/core';

function stripTS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = babel.transformSync(code, {
    filename: filePath,
    presets: [
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
    ],
    retainLines: true,
  });
  fs.writeFileSync(filePath, result.code);
  console.log('Stripped ' + filePath);
}

try {
  stripTS('src/components/Header.jsx');
  stripTS('src/components/First.jsx');
} catch (e) {
  console.error(e);
  process.exit(1);
}
