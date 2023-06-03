/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: "jest",
      config: "e2e/jest.config.js",
    },
    jest: {
      setupTimeout: 300000,
    },
  },
  apps: {
    "ios.debug": {
      type: "ios.app",
      binaryPath: "Spelieve.app",
    },
    "ios.release": {
      type: "ios.app",
      binaryPath: "Spelieve.app",
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "Spelieve.apk",
      reversePorts: [8081],
    },
    "android.release": {
      type: "android.apk",
      binaryPath: "Spelieve.apk",
      testBinaryPath: "Spelieve.apk",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 12",
      },
    },
    attached: {
      type: "android.attached",
      device: {
        adbName: ".*",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Pixel_3a_API_30_x86",
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
    "android.att.debug": {
      device: "attached",
      app: "android.debug",
    },
    "android.att.release": {
      device: "attached",
      app: "android.release",
    },
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
    "android.emu.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
