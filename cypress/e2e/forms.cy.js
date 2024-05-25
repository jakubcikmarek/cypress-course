describe("forms tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    cy.contains(/Testing Forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribeInput");
    cy.get("@subscribeInput").type("randomail@test.com");
    cy.contains(/Successfully subbed:/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed:/i, { timeout: 3000 }).should("exist");
    cy.contains(/Successfully subbed:/i).should("not.exist");

    cy.get("@subscribeInput").type("randomail@test.cz");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Invalid email:/i, { timeout: 3000 }).should("exist");
    cy.contains(/Invalid email:/i).should("not.exist");

    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
