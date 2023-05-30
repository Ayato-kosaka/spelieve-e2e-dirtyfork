/**
 * シミュレータ用ビルドファイルの取得と展開
 *
 * このファイルは最新のシミュレータ用ビルドファイルを取得し、展開します。
 * 注意点：
 * - 事前に ios.simulator: true となっている profile の EAS Buildを行う必要があります。
 *
 * @see {@link https://tech.hello.ai/entry/2022/11/22/121019}
 * @fileoverview
 * @name fetchSimulatorBuild.js
 */

const axios = require('axios');
const path = require('path');
const { existsSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const OUTPUT_TAR_PATH = path.resolve(__dirname, 'Sample.tar.gz');
const OUTPUT_SIMULATOR_BUILD_BINARY_PATH = path.resolve(__dirname, '.');

// 最新のシミュレータ用ビルドファイルを取得する
const getLatestSimulatorBuildBinary = async (platform) => {
	if (existsSync(`${OUTPUT_SIMULATOR_BUILD_BINARY_PATH}/Sample.app`)) {
		return;
	}

	try {
		// 最新のシミュレータ用ビルドの結果リストを取得する
		const buildJson = execSync(
			`eas build:list --status finished --platform ${platform} --distribution simulator --non-interactive --json`,
		);
		// 最新のシミュレータ用ビルドファイルのURLを取得
		const buildUrl = JSON.parse(buildJson.toString())[0]?.artifacts?.buildUrl;
		const response = await fetchBinary(buildUrl);
		writeFileSync(OUTPUT_TAR_PATH, response.data);

		if (!buildUrl) {
			throw new Error('simulator buildしたバイナリが存在しません。simulator buildを実行して、再度試してください。');
		}

		// Sample.appファイルに展開する
		execSync(`tar -xf ${OUTPUT_TAR_PATH} -C ${OUTPUT_SIMULATOR_BUILD_BINARY_PATH} && rm -rf ${OUTPUT_TAR_PATH}`);

		return console.log('success: バイナリの取得が完了しました。');
	} catch (e) {
		throw new Error(`error log: ${e}`);
	}
};

const fetchBinary = async (url) => {
	return axios.get(url, {
		responseType: 'arraybuffer',
		headers: { Accept: 'application/x-tar' },
	});
};

// 一旦iOSのみ
(async () => await getLatestSimulatorBuildBinary('ios'))();
