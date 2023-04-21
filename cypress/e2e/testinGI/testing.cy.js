describe("To-Do App", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
  });

  it("can mark all todo items as completed", () => {
    cy.get(".new-todo").type("Test mark all todo items{enter}");
    cy.get(".todo-list li").eq(0).find(".toggle").check();
    cy.get(".toggle-all").check();
    cy.get(".todo-list li").eq(0).should("have.class", "completed");
  });

  it("can filter todo items by active status", () => {
    cy.get(".new-todo").type("Test active todo item{enter}");
    cy.get(".new-todo").type("Test completed todo item{enter}");
    cy.get(".todo-list li").eq(1).find(".toggle").check();
    cy.contains("Active").click();
    cy.get(".todo-list").should("not.contain", "Test completed todo item");
    cy.get(".todo-list li").should("have.length", 1);
  });

  it("can filter todo items by completed status", () => {
    cy.get(".new-todo").type("Test active todo item{enter}");
    cy.get(".new-todo").type("Test completed todo item{enter}");
    cy.get(".todo-list li").eq(1).find(".toggle").check();
    cy.contains("Completed").click();
    cy.get(".todo-list").should("contain", "Test completed todo item");
    cy.get(".todo-list li").should("have.length", 1);
  });

  it("can edit an existing todo item", () => {
    cy.get(".new-todo").type("Test edit todo item{enter}");
    cy.get(".todo-list li").eq(0).find("label").dblclick();
    cy.get(".todo-list li")
      .eq(0)
      .find(".edit")
      .clear()
      .type("Updated todo item{enter}");
    cy.get(".todo-list li").eq(0).should("contain", "Updated todo item");
  });
});
