# Keystone Property Manager

## Development Guidelines

### Internationalization (i18n) - MANDATORY

**Rule:** All user-facing text **MUST** be internationalized using `react-i18next`.

*   **Never** hardcode strings in components or pages (e.g., `<h1>Hello</h1>` is forbidden).
*   **Always** use the `t` function (e.g., `<h1>{t('greeting')}</h1>`).
*   **Always** add keys to both `locales/en.ts` and `locales/pt.ts`.
*   **Dates & Numbers:** Use `toLocaleString` with `i18n.language` to format dates and currency.

#### Workflow for adding text:
1.  Identify the text string.
2.  Create a semantic key (e.g., `prospect.details.rooms`).
3.  Add the English translation to `locales/en.ts`.
4.  Add the Portuguese translation to `locales/pt.ts`.
5.  Use `t('prospect.details.rooms')` in the React component.
