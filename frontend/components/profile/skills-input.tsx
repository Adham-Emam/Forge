'use client'
import React, { useState, useEffect } from 'react'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { XCircle } from 'lucide-react' // icons for skill tag & remove button

interface SkillsInputProps {
  control: any // your form.control type
  name: string
  suggestions?: string[] // predefined skill suggestions for autocomplete
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  control,
  name,
  suggestions = [],
}) => {
  // We'll manage local state for the input value and filtered suggestions
  const [inputValue, setInputValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }
    const filtered = suggestions.filter(
      (skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase()) &&
        !skills.includes(skill)
    )
    setFilteredSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }, [inputValue, suggestions, skills])

  // Set skills to value on initial render and when value changes
  useEffect(() => {
    setSkills(control._fields[name]._f.value)
  }, [control, name])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange } = field

        // Add skill and clear input
        const addSkill = (skill: string) => {
          if (skills.length >= 10) {
            return
          }
          if (!skills.includes(skill)) {
            onChange([...skills, skill])
            setInputValue('')
            setSkills([...skills, skill])
            setShowSuggestions(false)
          }
        }

        // Remove skill
        const removeSkill = (skill: string) => {
          const newSkills = skills.filter((s) => s !== skill)
          setSkills(newSkills)
          onChange(newSkills)
        }

        // Handle keyboard keys (Enter, comma, backspace)
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            if (inputValue.trim() && !skills.includes(inputValue.trim())) {
              addSkill(inputValue.trim())
            }
          } else if (
            e.key === 'Backspace' &&
            !inputValue &&
            skills.length > 0
          ) {
            // Remove last skill if input empty and backspace pressed
            e.preventDefault()
            const newSkills = skills.slice(0, -1)
            setSkills(newSkills)
            onChange(newSkills)
          }
        }

        return (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <p className="text-muted-foreground mb-2">
                  Add up to 10 skills
                </p>
                <div
                  className="flex flex-wrap gap-2 p-3 border bg-background rounded-md focus-within:ring-2 focus-within:ring-accent transition"
                  onClick={() => document.getElementById(name)?.focus()}
                >
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 bg-card border px-3 py-1 rounded-full text-sm select-none"
                    >
                      {skill}
                      <XCircle
                        className="w-4 h-4 cursor-pointer hover:text-red-500"
                        onClick={() => removeSkill(skill)}
                      />
                    </span>
                  ))}
                  <input
                    id={name}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      skills.length === 0 ? 'Start typing your skills...' : ''
                    }
                    className="flex-grow min-w-[150px] outline-none border-none bg-transparent placeholder-gray-400"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                {showSuggestions && (
                  <ul className="mt-1 max-h-40 overflow-auto border bg-background rounded-md  shadow-lg z-50 absolute w-full">
                    {filteredSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        onClick={() => addSkill(suggestion)}
                        className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground transition"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FormControl>

            <FormMessage />
            <p className="mt-2 text-xs text-muted-foreground italic">
              Empower your journey — every skill is a step closer to mastery.
            </p>
          </FormItem>
        )
      }}
    />
  )
}
