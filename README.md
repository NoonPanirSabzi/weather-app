# Weather app

## Table of contents

- [Overview](#overview)
  - [Screenshot and live site URL](#screenshot-and-live-site-url)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Attribution](#attribution)

## Overview

### Screenshot and live site URL

| Desktop                             | Tablet                            | Mobile                            |
| ----------------------------------- | --------------------------------- | --------------------------------- |
| ![desktop](/screenshot/desktop.png) | ![Tablet](/screenshot/tablet.png) | ![Mobile](/screenshot/mobile.png) |

[Live Site URL](https://ab-va-hava.netlify.app/)

## My process

### Built with

- React
- TailwindCSS
- TS

### What I learned

-   The `width: max-content` CSS property and value prevents text from wrapping, even when ignoring parent constraints. This is particularly useful in layouts like Flexbox or Grid when an element needs to size itself based on its content.
-   Building a skeleton layout for loading states.
-   The first step in creating a skeleton layout is to fully build your actual UI layout.
-   Then, design a skeleton layout that mimics the actual layout and can be displayed on top of it.
-   Strategies for tracking component loading:
    -   Tracking `<img>` elements using the `onLoad` event.
    -   Monitoring font loading with `document.fonts.ready`.
    -   Verifying complete API data fetching.
    -   Checking `<iframe>` loading via their `onLoad` event.
    -   An alternative approach is to create a custom hook to prefetch necessary images for the application.
-   To prevent users from seeing blank pages and to display skeleton layouts as quickly as possible, consider using a framework like Next.js. Such frameworks can render the skeleton layout on the server, sending the necessary HTML and CSS to the client for immediate display.
-   Implementing input debouncing in React typically involves two states and two `useEffect` hooks to delay processing until the user has finished typing.
-   Using the `AbortController` API in conjunction with a `useEffect` cleanup function to cancel outdated web requests.
-   Understanding the `useEffect` lifecycle:
    -   The `useEffect` body executes after a component renders.
    -   The `useEffect` cleanup function runs before the component unmounts or before the next re-render.
    This means: a component is called, top-level code executes during rendering, JSX is returned and rendered, then the `useEffect` body runs. If a user interacts with the component, changing states within the effect's dependency array, React will execute the effect's cleanup function before the next re-render, allowing for the cleanup of any connections or subscriptions created in the effect body. The component then re-renders, restarting this cycle.
-   The `AbortController.abort()` function can be effectively called within a `useEffect` cleanup function to cancel previous unfinished or even completed (but no longer needed) fetch requests.
-   Utilizing the `ReactNode` type for variables that will hold JSX content.
-   An elegant and simple way to filter out all falsy values (like `undefined`, `null`, `empty strings`, etc.) from an array is to use `Array.prototype.filter()` with the `Boolean` constructor: `arr.filter(Boolean)`. This passes the `Boolean` function to `filter`, which then calls `Boolean()` on each array item, keeping only the truthy ones.
-   The `useState` initializer function runs only once, during the component's initial render. Unlike `useEffect`, which can run after every render or when specific dependencies change, the initializer does not re-execute. If the state needs to update based on prop changes in subsequent renders, it must be managed with a `useEffect` or by manually updating the state via its setter function.
-   When initializing `useState` with either a function or a prop's value, it only runs once during the component's initial render and after its first mount. Subsequent updates to the prop will not re-run the initializer; React expects you to update the state manually using the provided setter function.
-   When a child component's internal state needs to be reset in response to a prop change, avoid using a `useEffect` for this. Instead, provide the child component with a unique `key` prop from its parent. When this `key` changes (e.g., tied to the updating prop), React will unmount the old component instance and mount a new one, effectively resetting its state. This recommendation aligns with advice from `react.dev` on avoiding unnecessary hooks.
-   Observed an issue with Tailwind CSS where custom text presets correctly apply `line-height` to `<p>` elements but not to `<span>` elements, with the underlying reason being unknown.
-   Understanding TypeScript's `Partial<T>` utility type:
    -   **Use Case:** Makes all properties of type `T` optional.
    -   **Usage:** When working with a `Partial<T>` type, you'll need to use type assertions or narrowing (e.g., checking `if (value.property)` or `if ('property' in value)`) to inform TypeScript that a particular property exists and is of its original type `X` before accessing it. This ensures type safety and allows you to perform operations specific to type `X`.
-   Object Spread Syntax ( `{ ...A, ...B }` ):
    -   **Merging Multiple Objects:** You can spread two or more objects into a new object.
    -   **Order Matters:** Properties from objects spread later in the syntax will override properties from objects spread earlier if they share the same key. For example, in `{ ...A, ...B }`, properties in `B` will update those in `A`. New properties from `B` will be added.
    -   **Utility for State Management:** This behavior is extremely useful for providing partial updates to object-based React states. By spreading the previous state into a new object literal and then spreading the object containing the desired updates, you can immutably update specific keys while preserving others, then set the new object as the component's state.


## Author

- Github - [@aminforouzan](https://github.com/aminforouzan)
- Frontend Mentor - [@AminForouzan](https://www.frontendmentor.io/profile/AminForouzan)

## Attribution

- [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).
