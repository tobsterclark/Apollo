#!/bin/bash

# uncomment for debug
# set +x

MY_DIR=`dirname $0`
SRC_DIR=`cd ${MY_DIR} && pwd`

do_it() {
BUILD_DIR="${SRC_DIR}/build"
DEPLOY_DIR="${SRC_DIR}/../apollo"

cd ${SRC_DIR}
yarn build

# trash old public
rm -R ${DEPLOY_DIR}/public

cp -R ${SRC_DIR}/build ${DEPLOY_DIR}/public
cd ${DEPLOY_DIR}

firebase deploy --except functions
}

do_it | tee -a ${SRC_DIR}/log.txt
