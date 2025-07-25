* Start any task by reading Project.md and TASKS.md
* BEFORE starting any task: if requirements are unclear, conflicting, or ambiguous, STOP and ask for clarification rather than making assumptions
* If you discover conflicts between Project.md, TASKS.md, and current instructions, STOP and ask which takes priority
* This project is in alpha development stage - prioritize functionality over backward compatibility when making code edits
* Implement complete, working features immediately - no placeholders, mocks, or "will implement later" suggestions
* When updating documentation files (*.md): explain WHAT and WHY, not HOW - use JSON schemas, tables, and diagrams to illustrate concepts - keep docs focused on architecture, specifications, and business logic rather than implementation syntax
* If you cannot complete a task for any reason, add the specific blocker and task details to TASKS.md and update the summary
* When discovering new tasks outside the current scope, create a TODO comment with placeholder and add the new task to TASKS.md
* When user clarifies new requirements, update both Project.md and TASKS.md accordingly

* If testing reveals bugs that prevent further testing, investigate root causes and document them in TASKS.md as critical issues
* Test functionality thoroughly - the same feature can work in one context and fail in another, so verify each implementation independently before marking as complete
* Verify all functionality through direct testing rather than trusting status indicators, KPIs, or data displays - these can be broken or mocked
* Document all issues discovered during testing in TASKS.md immediately
* Use Browser MCP for testing whenever possible to simulate real user interactions

* Once the code edit is done, build and test the solution, document any known issues in TASKS.md
* Once the code edit is done, commit the code, and push the main branch.
