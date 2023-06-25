describe("spec.cy.js", () => {
  it("should pass", () => {
    cy.visit("http://localhost:19006/");
    expect(true).to.equal(true);
  });
});
