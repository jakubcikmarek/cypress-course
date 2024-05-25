describe("Various tests", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getDataTest("nav-forms").click();
    cy.location("pathname").should("equal", "/forms");

    cy.getDataTest("nav-examples").click();
    cy.location("pathname").should("equal", "/examples");

    cy.getDataTest("nav-component").click();
    cy.location("pathname").should("equal", "/component");

    cy.getDataTest("nav-best-practices").click();
    cy.location("pathname").should("equal", "/best-practices");
  });
});

describe("Various tests optimal", () => {
  //lepší způsob než ukazoval tutorial
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("multi-page testing", () => {
    const navItems = [
      { testId: "nav-why-cypress", expectedPath: "/" },
      { testId: "nav-overview", expectedPath: "/overview" },
      { testId: "nav-fundamentals", expectedPath: "/fundamentals" },
      { testId: "nav-forms", expectedPath: "/forms" },
      { testId: "nav-examples", expectedPath: "/examples" },
      { testId: "nav-component", expectedPath: "/component" },
      { testId: "nav-best-practices", expectedPath: "/best-practices" },
    ];

    navItems.forEach((item) => {
      cy.getDataTest(item.testId).click();
      cy.location("pathname").should("equal", item.expectedPath);
    });
  });

  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getDataTest("post-button").click();
  });

  it.only("grudges", () => {
    cy.contains(/add some grudges/i).should("exist");
    cy.getDataTest("clear-grudges-button").should("not.exist");
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
    cy.getDataTest("grudges-title").should("have.text", "Add Some Grudges");

    cy.getDataTest("grudge-input").within(() =>
      cy.get("input").type("some grudge"),
    );
    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.getDataTest("grudges-title").should("have.text", "Grudges");
    cy.getDataTest("grudge-input").within(() =>
      cy.get("input").type("number two"),
    );
    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contain.text", "some grudge");
    });

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
      cy.get("li").should("have.length", 1);
    });

    cy.getDataTest("grudge-input").within(() =>
      cy.get("input").type("number three"),
    );
    cy.getDataTest("add-grudge-button").click();
    cy.getDataTest("clear-grudges-button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
