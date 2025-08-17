export const PROJECT_TEMPLATES = [
  {
    emoji: "🎬",
    title: "Build a Netflix clone",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a Netflix-style homepage with a hero banner, multiple movie sections, responsive movie cards, and a modal for viewing movie details.

Requirements:
- Use React components and local state (React hooks)
- Style using Tailwind CSS
- Use mock data for movies
- Use a dark mode-friendly gradient in the hero
- Ensure responsiveness and accessibility
- No external libraries

Output: A single React component with JSX and Tailwind classes in a code block.`
  },
  {
    emoji: "📦",
    title: "Build an admin dashboard",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build an admin dashboard with a sidebar, stat cards, a chart placeholder, and a table with filters and pagination.

Requirements:
- Use React and local state
- Style with Tailwind CSS
- Include mock data
- Ensure clear visual grouping and spacing
- No external libraries

Output: A single React component with JSX and Tailwind CSS inside a code block.`
  },
  {
    emoji: "📋",
    title: "Build a kanban board",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a kanban board with columns for tasks, supporting drag-and-drop, and the ability to add/remove tasks.

Requirements:
- Use React and local state
- Use react-beautiful-dnd for drag-and-drop
- Style with Tailwind CSS
- Use mock data
- Ensure consistent spacing, column widths, and hover effects

Output: A single React component inside a code block.`
  },
  {
    emoji: "🗂️",
    title: "Build a file manager",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a file manager with a folder list, file grid, and options to rename or delete files or folders.

Requirements:
- Use React with local state
- Use Tailwind CSS for styling
- Use mock data
- Clearly distinguish folders from files with icons and layout
- Ensure clean spacing and accessibility

Output: A single React component in a code block.`
  },
  {
    emoji: "📺",
    title: "Build a YouTube clone",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a YouTube-style homepage with video thumbnails, a category sidebar, and a modal for video preview with title and description.

Requirements:
- Use React and local state
- Use Tailwind CSS for styling
- Use mock data
- Create a well-aligned grid layout
- Ensure responsiveness and accessibility

Output: A single React component inside a code block.`
  },
  {
    emoji: "🛍️",
    title: "Build a store page",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a store page with product category filters, a product grid, and a local shopping cart to add/remove items.

Requirements:
- Use React with local state
- Style using Tailwind CSS
- Use mock data
- Prioritize clear typography, spacing, and button states
- Ensure responsiveness and accessibility

Output: A single React component inside a code block.`
  },
  {
    emoji: "🏡",
    title: "Build an Airbnb clone",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build an Airbnb-style listings grid with property cards, a filter sidebar, and a modal showing property details.

Requirements:
- Use React and local state
- Use Tailwind CSS
- Use mock data
- Focus on card spacing, soft shadows, and a clean layout
- Ensure the UI is welcoming, responsive, and accessible

Output: A single React component in a code block.`
  },
  {
    emoji: "🎵",
    title: "Build a Spotify clone",
    prompt: `Generate a clean, modern UI for a web app.

Task: Build a Spotify-style music player with a sidebar for playlists, a main area for song details, and playback controls.

Requirements:
- Use React and local state
- Style using Tailwind CSS
- Use mock data
- Support song selection and playback simulation
- Use dark mode and ensure layout balance

Output: A single React component inside a code block.`
  }
] as const;
