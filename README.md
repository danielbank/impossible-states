## Impossible States

This app is a very simplistic illustration of how you can get TypeScript to understand more about the runtime state of your application, and help make impossible states impossible.

The goal is to enforce a basic state machine that looks like:
ordered -> received -> in_stock -> sold

By putting guardrails around the code for transitions, in particular moving from `in_stock` to `sold`

### Branches

- step-0: This branch shows a first, very naive approach to implementing a sell method
- step-1: We eliminate the ability to do an invalid transition from `ordered`, `received`, or `sold` by restricting the status that the sell method can accept
- step-2: Take the status awareness one step further by baking it into the db fetch itself

### LEARNINGS

Don't do Generics on everything but the most important state (i.e. state machine variables like `status`)
