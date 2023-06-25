describe("spec.cy.ts", () => {
  it("should pass", () => {
    cy.visit("http://localhost:19006/");
    expect(true).to.equal(true);
  });
});
