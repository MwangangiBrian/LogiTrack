"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../functions/themeProvider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (<>
    <button
      onClick={toggleTheme}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all dark:hidden" />
      ) : (
        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all hidden dark:block" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
    {/* <Button
            onClick={toggleTheme}
            className="bg-transparent text-purple-800 hover:bg-transparent border-0"
          >
            {theme === 'light' ? <Sun /> : <MoonStar />}
          </Button> */}
    </>
  )
}

