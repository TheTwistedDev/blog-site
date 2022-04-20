import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import ReactMarkdown from 'react-markdown'
import {
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineCloudUpload,
    HiOutlineTrash,
} from 'react-icons/hi'
import { MarkdownIcon, MDComponents } from './index'

const tabs = [
  { text: 'Write', icon: HiOutlinePencil },
  { text: 'Preview', icon: HiOutlineEye },
]

const Editor = ({
  initialData = null,
  showDeleteButton = false,
  showPublishButton = false,
  disabled = false,
  debouncedDelay = 500,
  onChange = () => null,
  onPublish = () => null,
  onDelete = () => null,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')

  // Debounced values - for auto save
  const [debouncedTitle] = useDebounce(title, debouncedDelay)
  const [debouncedContent] = useDebounce(content, debouncedDelay)

  // Use to keep track of initial render
  const initialRender = useRef(true)

  useEffect(() => {
    // Don't run on initial render
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    // Pass debounced values
    onChange(debouncedTitle, debouncedContent)
  }, [debouncedTitle, debouncedContent])

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      {/* Blog post title */}
      <textarea
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength="150"
        placeholder="Title…"
        disabled={disabled}
        className="w-full text-3xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed"
      />

      {/* Action tabs */}
      <div className="sticky top-0 flex items-center justify-center px-4 py-2 mt-6 space-x-2 text-gray-700 bg-gray-100 border border-gray-300 rounded sm:justify-between dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
        <div className="flex flex-row items-center justify-center space-x-6 sm:space-x-4">
          {tabs.map(({ text, icon: Icon }, i) => (
            <button
              key={text}
              onClick={() => setActiveTab(i)}
              disabled={disabled}
              className={`flex items-center space-x-1 transition-colors rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === i
                  ? 'text-blue-600 cursor-default select-none disabled:hover:text-blue-600'
                  : 'hover:text-blue-600 disabled:hover:text-current'
              }`}
            >
              <Icon className="flex-shrink-0 w-6 h-6" />
              <span className="hidden sm:inline-block">{text}</span>
            </button>
          ))}

          {showPublishButton ? (
            <button
              onClick={() => onPublish(title, content)}
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <HiOutlineCloudUpload className="flex-shrink-0 w-6 h-6" />
              <span className="hidden sm:inline-block">Publish</span>
            </button>
          ) : null}

          {showDeleteButton ? (
            <button
              onClick={onDelete}
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <HiOutlineTrash className="flex-shrink-0 w-6 h-6" />
              <span className="hidden sm:inline-block">Delete</span>
            </button>
          ) : null}
        </div>

        <a
          href="https://commonmark.org/help/"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center hidden space-x-1 sm:flex hover:text-blue-600"
        >
          <MarkdownIcon className="flex-shrink-0 w-6 h-6" />
          <span className="hidden sm:inline-block">Mardown supported</span>
        </a>
      </div>

      {/* Blog post content */}
      <div className="px-4 py-12">
        {activeTab === 0 ? (
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Tell your story..."
            disabled={disabled}
            className="w-full min-h-screen text-xl leading-snug bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed"
          />
        ) : (
          <article className="min-h-screen prose dark:prose-dark sm:prose-lg lg:prose-xl max-w-none">
            {content ? (
              <ReactMarkdown components={MDComponents} children={content} />
            ) : (
              <p>Nothing to preview yet...</p>
            )}
          </article>
        )}
      </div>
    </div>
  )
}

export default Editor