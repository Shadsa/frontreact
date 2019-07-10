#!/bin/sh
npm install > build.log

npm run build  >> build.log
npm run lint  >> build.log
npm run test  >> build.log
doxygen doxygenfile  >> build.log


exec "$@"
