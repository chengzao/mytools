#!/bin/bash
echo "-------now is $1 file-------";

cd gulp && npm install && npm run gulpD && npm run gulpR; 

echo "-------now is $2 file-------";

cd ../gulp@ts && npm install && npm run gulp

echo "-------now is $3 file-------";

cd ../parcel && npm install && npm run build

echo "-------now is $4 file-------";

cd ../rollup && npm install && npm run build && npm run multi && npm run gulp

echo "-------now is $5 file-------";

cd ../webpack@3 && npm install && npm run test