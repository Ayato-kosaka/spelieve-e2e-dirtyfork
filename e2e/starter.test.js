describe("Example", () => {
  beforeAll(async () => {
    console.log("before launchApp");
    await device.launchApp();
    console.log("after launchApp");
  });

  beforeEach(async () => {
    console.log("before reloadReactNative");
    await device.reloadReactNative();
    console.log("after reloadReactNative");
  });

  it("should have welcome screen", async () => {
    console.log("before expect");
    await expect(element(by.id("welcome"))).toBeVisible();
    console.log("after expect");
  });

  it("should show hello screen after tap", async () => {
    await element(by.id("hello_button")).tap();
    await expect(element(by.text("Hello!!!"))).toBeVisible();
  });

  it("should show world screen after tap", async () => {
    await element(by.id("world_button")).tap();
    await expect(element(by.text("World!!!"))).toBeVisible();
  });
});
