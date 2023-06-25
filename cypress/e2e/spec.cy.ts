describe("spec.cy.ts", () => {
  it("should pass", () => {
    cy.visit("http://localhost:19006/");
    cy.screenshot();
    expect(true).to.equal(true);
    cy.screenshot();
  });
});
