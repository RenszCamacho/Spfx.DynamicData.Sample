# Code Review Rules - SPFx Dynamic Data Sample

## TypeScript
- Use `const` and `let`, never `var`
- Prefer `interface` over `type` for object shapes
- Avoid `any` type - use `unknown` or specific types
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer readonly arrays and objects when possible

## React
- Use functional components with hooks
- Prefer named exports over default exports
- Use React.FC type for component props
- Avoid inline styles - use CSS modules or styled-components
- Components should be small and focused

## SPFx Best Practices
- Use `@microsoft/sp-core-library` for SPFx utilities
- Follow SharePoint framework patterns for web parts
- Use proper property pane controls
- Handle errors gracefully with user-friendly messages
- Use PnPjs for SharePoint operations when possible

## Code Quality
- No console.log in production code
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Follow existing code style in the project

