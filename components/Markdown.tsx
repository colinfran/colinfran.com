import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

type Props = {
  content: string
}

const Markdown: FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h2: ({ ...props }) => <h2 className="my-4 text-4xl font-semibold" {...props} />,
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h3: ({ ...props }) => <h3 className="my-4 text-3xl font-semibold" {...props} />,
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ ...props }) => <img alt="" className="m-auto my-4 max-w-[100%] md:max-w-[600px]" {...props} />,
        code(props) {
          const { children, className, node, ...rest } = props // eslint-disable-line unused-imports/no-unused-vars
          const match = /language-(\w+)/.exec(className || "")
          return match ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              children={String(children).replace(/\n$/, "")} // eslint-disable-line react/no-children-prop
              language={match[1]}
              PreTag="div"
              style={darcula}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown
