# Simple Music Dashboard

Every time you choose to apply a rule(s), explicitly state the rule(s) in the output. You can abbreviate the rule description to a single word or phrase.

## Project Context

It's a Dashboard for managing music playlists and tracks. The dashboard should allow users to view, create, update, and delete playlists and tracks. The dashboard should also allow users to search for tracks and add them to playlists.

- Multi Sort, Filter, Pagination and Search is There

## Code Style and Structure

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)

Structure repository files as follows:

```text
src
├── api             # API calls
├── assets          # Static assets
├── components      # Shared React components
│   └── ui          # Shadcn UI components
├── hooks           # Custom React hooks
├── lib             # Helper functions and Shared libraries
├── routs           # Routes and Pages
├── store           # Global state management
├── style           # CSS and Tailwind CSS
└── types           # TypeScript types
```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- Tanstack Query
- Tanstack Router

## Naming Conventions

- Use lowercase with dashes for directories and files (e.g., components/form-wizard)
- Favor named exports for components and utilities

## TypeScript Usage

- Use TypeScript for all code; prefer types over types
- Avoid enums; use const objects with 'as const' assertion
- Use functional components with TypeScript type
- Define strict types for message passing between different parts of the extension
- Use absolute imports for all files @/...
- Avoid try/catch blocks unless there's good reason to translate or handle error in that abstraction
- Use explicit return types for all functions

## State Management

- Use Zustand for global state when needed
- Implement proper cleanup in useEffect hooks

## Syntax and Formatting

- Use "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals
- Use declarative JSX
- Implement proper TypeScript discriminated unions for message types

## UI and Styling

- Use Shadcn UI and Radix for components
- use `npx shadcn@latest add <component-name>` to add new shadcn components
- Implement Tailwind CSS for styling
- When adding new shadcn component, document the installation command

## Error Handling

- Implement proper error boundaries
- Log errors appropriately for debugging
- Provide user-friendly error messages
- Handle network failures gracefully

## Security

- Implement Content Security Policy
- Sanitize user inputs
- Handle sensitive data properly
- Implement proper CORS handling

## Git Usage

Commit Message Prefixes:

- "fix:" for bug fixes
- "feature:" for new features
- "perf:" for performance improvements
- "docs:" for documentation changes
- "style:" for formatting changes
- "refactor:" for code refactoring
- "test:" for adding missing tests
- "chore:" for maintenance tasks

Rules:

- Use lowercase for commit messages
- Keep the summary line concise
- Include description for non-obvious changes
- Reference issue numbers when applicable

## Documentation

- Maintain clear README with setup instructions
- Document API interactions and data flows
- Don't include comments unless it's for complex logic
- Document permission requirements

## Development Workflow

- Use proper version control
- Implement proper code review process
- Test in multiple environments
- Follow semantic versioning for releases
- Maintain changelog
